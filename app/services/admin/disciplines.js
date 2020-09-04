/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:disciplines');
// Utils
const shared = require('../shared');
// Schema
const schema = require('../../schemas/disciplines');
// Models
const { Discipline } = require('../../database/models');
// AWS S3
const {
  uploadImageToAWS,
  deleteImageFromAWS,
  extractKeyFromUrl
} = require('../../utils/awsServices');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');
// Config
const { AWS } = require('../../config/config');

/**
 * Gets all disciplines registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAll(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    // Query
    let res = await Discipline.findAll({
      where: { isDelete: false, gymId },
      attributes: ['id', 'name', 'serial'],
      order: [['id', 'ASC']]
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Finds a discipline by its id
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getById(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let id = paramsValues[0];
    let gymId = authHeader[1];

    // Query
    let res = await Discipline.findOne({
      where: { id, gymId, isDelete: false },
      attributes: {
        include: [],
        exclude: ['isDelete', 'ratingCount', 'ratingSum']
      },
      include: [
        {
          association: 'media',
          attributes: ['id', 'typeId', 'url']
        }
      ]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('disciplines.notFound'), 404);
    }

    return res;
  } catch (e) {
    debug('Error: ', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Creates an discipline
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let object = paramsValues[0];
    let gymId = authHeader[1];
    var uploadMedia;

    //Check Schema // Verifies correct body request
    object.gymId = gymId;

    schema['required'] = ['gymId', 'name', 'description', 'isActive'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    //Check  new media
    if (object.media && object.media.length > 0) {
      if (object.media[0].base64) {
        uploadMedia = await uploadImageToAWS(
          object.media[0].base64,
          '/disciplines'
        );
        if (uploadMedia.Location) {
          object.media[0].url = uploadMedia.Location;
        }
        delete object.media[0].base64;
      } else {
        object.media[0].url = AWS.S3_URL + 'no-image-available.png';
      }
      // Deleting system attributes
      ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
        delete object.media[0][key];
      });
      object.media[0].typeId = 31;
    } else {
      object.media = [
        {
          typeId: 31,
          url: AWS.S3_URL + 'no-image-available.png'
        }
      ];
    }

    // Deleting system attributes
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    object.rating = 5;
    object.ratingCount = null;
    object.ratingSum = null;
    // Inserts Disciplines in DB
    res = await Discipline.create(object, {
      include: [
        {
          association: 'media'
        }
      ]
    });
    return { success: { id: res.id }, code: 201 };
  } catch (e) {
    if (uploadMedia) {
      await deleteImageFromAWS(uploadMedia.key);
    }
    if (e.originalError && e.originalError.errno === 'ENOTFOUND') {
      return errorMessage(i18n.__('general.imageUpload'), 444);
    } else if (e.parent && e.parent.constraint === 'disciplines_gym_id_fkey') {
      return errorMessage(i18n.__('disciplines.fk.gymId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Updates a discipline information
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function updateOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let id = paramsValues[0];
    let object = paramsValues[1];
    let gymId = authHeader[1];
    var uploadMedia;

    delete schema['required'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    // Gets current discipline data
    res = await Discipline.findOne({
      where: { id, gymId, isDelete: false },
      include: [
        {
          association: 'media'
        }
      ]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('disciplines.notFound'), 404);
    }
    //Checks new media
    let key;
    if (res.media[0]) {
      key = extractKeyFromUrl(res.media[0].url, 'no-image-available.png');
    }
    delete object.media[0].url;
    if (object.media[0].base64) {
      uploadMedia = await uploadImageToAWS(
        object.media[0].base64,
        '/disciplines',
        key
      );
      if (uploadMedia.Location) {
        object.media[0].url = uploadMedia.Location;
      }
      delete object.media[0].base64;
    }
    // Deleting system attributes
    ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object.media[0][key];
    });

    object.gymId = gymId;
    // Deleting system attributes
    [
      'isDelete',
      'createdAt',
      'updatedAt',
      'rating',
      'ratingSum',
      'ratingCount'
    ].forEach(function(key) {
      delete object[key];
    });
    //Update in Database
    await res.update(object);
    await res.media[0].update(object['media'][0]);

    return {
      success: {},
      code: 200
    };
  } catch (e) {
    if (e.originalError && e.originalError.errno === 'ENOTFOUND') {
      return errorMessage(i18n.__('general.imageUpload'), 444);
    } else if (e.parent && e.parent.constraint === 'disciplines_gym_id_fkey') {
      return errorMessage(i18n.__('disciplines.fk.gymId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Deletes an discipline
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function deleteOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let id = paramsValues[0];
    let gymId = authHeader[1];
    // Gets current gym data
    let res = await Discipline.findOne({
      where: { id, gymId, isDelete: false }
    });
    // Gym not found
    if (res === null) {
      return errorMessage(i18n.__('disciplines.notFound'), 404);
    }

    res = await res.update({ isDelete: true });
    return {
      success: {},
      //count: object.row_count,
      code: 200
    };
  } catch (e) {
    debug('Error:', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

module.exports = {
  getAll,
  getById,
  createOne,
  updateOne,
  deleteOne
};
