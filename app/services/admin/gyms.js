/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:gyms');
// Utils
const shared = require('../shared');
// Schema
const schema = require('../../schemas/gyms');
// Models
const { Gym } = require('../../database/models');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');
// AWS S3
const {
  uploadImageToAWS,
  deleteImageFromAWS,
  extractKeyFromUrl
} = require('../../utils/awsServices');
// Config
const { AWS } = require('../../config/config');

/**
 * Gets all gyms registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAll(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);

    // Query
    let res = await Gym.findAll({
      attributes: ['id', 'name', 'email', 'phone1'],
      where: { isDelete: false },
      order: [['id', 'ASC']]
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Finds an gym by its id
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getById(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId, attributes;
    attributes = {
      include: [],
      exclude: ['isDelete']
    };
    if (authHeader[1]) {
      gymId = authHeader[1];
    } else {
      gymId = paramsValues[0];
    }
    let userGroupId = authHeader[2];
    // Query
    let res = await Gym.findOne({
      attributes,
      where: { id: gymId, isDelete: false },
      include: [
        {
          association: 'media',
          attributes: ['id', 'url', 'typeId']
        }
      ],
      order: [['id', 'ASC']]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('gyms.notFound'), 404);
    }
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}
/**
 * Creates an gym
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let object = paramsValues[0];
    var upload, uploadMedia;
    //Check Schema
    schema['required'] = [
      'name',
      'email',
      'phone1',
      'latitude',
      'longitude',
      'reserveLimitNumber',
      'penaltyDays',
      'timezone',
      'minDaysReserve',
      'isActive'
    ];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    // Check image base64 for Logo
    if (object.base64) {
      upload = await uploadImageToAWS(object.base64, '/gyms');
      if (upload.Location) {
        object.logo = upload.Location;
      }
      delete object.base64;
    } else {
      object.logo = AWS.S3_URL + 'no-image-available.png';
    }
    // Check image base64 for Media
    if (object.media && object.media.length > 0) {
      if (object.media[0].base64) {
        uploadMedia = await uploadImageToAWS(object.media[0].base64, '/gyms');
        if (uploadMedia.Location) {
          object.media[0].url = uploadMedia.Location;
        }
        delete object.media[0].base64;
      } else {
        object.media[0].url = AWS.S3_URL + 'no-image-available.png';
      }
      // Delete systems attributes
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
    // Delete systems attributes
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    // Inserts Gym in DB
    object.rating = 5;
    object.preThankDays = 0;
    object.thankDays = 0;
    res = await Gym.create(object, {
      include: [
        {
          association: 'media'
        }
      ]
    });
    return { success: { id: res.id }, code: 201 };
  } catch (e) {
    if (upload) {
      await deleteImageFromAWS(upload.key);
    }
    if (uploadMedia) {
      await deleteImageFromAWS(uploadMedia.key);
    }
    if (e.originalError && e.originalError.errno === 'ENOTFOUND') {
      return errorMessage(i18n.__('general.imageUpload'), 444);
    } else {
      debug('Error:', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Updates gyms information
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function updateOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let id;
    if (authHeader[1]) {
      id = authHeader[1];
    } else {
      id = paramsValues[0];
    }
    let object = paramsValues[1];
    var upload, uploadMedia;
    delete object.media[0].url;

    //Check schema
    delete schema['required'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    // Gets current gym data
    res = await Gym.findOne({
      where: { id },
      include: [{ association: 'media' }]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('gyms.notFound'), 404);
    }
    // Check if exists new image for logo
    let key;
    if (res.logo) {
      key = extractKeyFromUrl(res.logo, 'no-image-available.png');
    }
    delete object.logo;
    if (object.base64) {
      upload = await uploadImageToAWS(object.base64, '/gyms', key);
      if (upload.Location) {
        object.logo = upload.Location;
      }
      delete object.base64;
    }
    // Delete systems attributes
    if (authHeader[1]) {
      [
        'isDelete',
        'createdAt',
        'updatedAt',
        'rating',
        'thankDays',
        'ratingCount',
        'ratingSum',
        'reserveLimitNumber',
        'isActive',
        'timezone'
      ].forEach(function(key) {
        delete object[key];
      });
    } else {
      [
        'isDelete',
        'createdAt',
        'updatedAt',
        'rating',
        'ratingCount',
        'ratingSum'
      ].forEach(function(key) {
        delete object[key];
      });
    }

    // Check if exists new image for Media
    //Checks new media
    key = null;
    if (res.media[0]) {
      key = extractKeyFromUrl(res.media[0].url, 'no-image-available.png');
    }
    delete object.media[0].url;
    if (object.media[0].base64) {
      uploadMedia = await uploadImageToAWS(
        object.media[0].base64,
        '/gyms',
        key
      );
      if (uploadMedia.Location) {
        object.media[0].url = uploadMedia.Location;
      }
      delete object.media[0].base64;
    }
    // Delete systems attributes
    ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object.media[0][key];
    });

    // Update Gym in DB
    await res.update(object);
    // Update Media Gym in DB
    await res.media[0].update(object['media'][0]);
    return { success: { id: res.id }, code: 200 };
  } catch (e) {
    if (e.originalError && e.originalError.errno === 'ENOTFOUND') {
      return errorMessage(i18n.__('general.imageUpload'), 444);
    } else {
      debug('Error:', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Deletes an gym
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function deleteOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let id = paramsValues[0];
    // Query
    let res = await Gym.findOne({ where: { id, isDelete: false } });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('gyms.notFound'), 404);
    }
    // Delete == Update isDelete: true
    res = await res.update({ isDelete: true });
    return { success: {}, code: 200 };
  } catch (e) {
    debug('Error: ', e);
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
