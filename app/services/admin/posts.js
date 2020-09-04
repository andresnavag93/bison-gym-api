/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:posts');
// Utils
const shared = require('../shared');
// Schema
const schema = require('../../schemas/posts');
// Models
const { Media, Post } = require('../../database/models');
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
 * Gets all posts registered
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
    let res = await Post.findAll({
      where: { isDelete: false, gymId },
      attributes: ['id', 'title', 'createdAt', 'updatedAt'],
      include: [
        {
          association: 'media',
          attributes: ['id', 'url', 'typeId']
        }
      ],
      order: [['updatedAt', 'DESC']]
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Finds a post by its id
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
    let res = await Post.findOne({
      where: { id, gymId, isDelete: false },
      attributes: {
        include: [],
        exclude: ['isDelete']
      },
      include: [
        {
          association: 'media',
          attributes: ['id', 'url', 'typeId']
        }
      ]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('posts.notFound'), 404);
    }

    return res;
  } catch (e) {
    debug('Error: ', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Creates a post
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

    //Check Schema
    object.gymId = gymId;
    schema['required'] = ['gymId', 'typeId', 'title', 'message'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    //Check  new media
    if (object.media && object.media[0]) {
      if (object.media[0].base64) {
        uploadMedia = await uploadImageToAWS(object.media[0].base64, '/posts');
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
    }

    // Inserts Gym in DB
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    res = await Post.create(object, {
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
    } else if (e.parent && e.parent.constraint === 'posts_type_id_fkey') {
      return errorMessage(i18n.__('posts.fk.typeId'), 404);
    } else if (e.parent && e.parent.constraint === 'banks_gym_id_fkey') {
      return errorMessage(i18n.__('posts.fk.gymId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Updates post information
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
    object.gymId = gymId;
    // Check Schema
    delete schema['required'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    // Query
    res = await Post.findOne({
      where: { id, gymId, isDelete: false },
      include: [
        {
          association: 'media'
        }
      ]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('posts.notFound'), 404);
    }
    let key;
    if (object.media && object.media[0]) {
      if (res.media[0]) {
        key = extractKeyFromUrl(res.media[0].url, 'no-image-available.png');
      }
      delete object.media[0].url;
      if (object.media[0].base64) {
        uploadMedia = await uploadImageToAWS(
          object.media[0].base64,
          '/posts',
          key
        );
        if (uploadMedia.Location) {
          object.media[0].url = uploadMedia.Location;
        }
        delete object.media[0].base64;
      }
      //Delete systems attributes
      ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
        delete object.media[0][key];
      });
      object.media[0].typeId = 31;
    }

    // Deleting system attributes
    ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    res = await res.update(object);

    if (object.media && object.media[0]) {
      if (res.media[0].id) {
        await res.media[0].update(object['media'][0]);
      } else {
        object['media'][0].postId = res.id;
        await Media.create(object['media'][0]);
      }
    }

    return {
      success: {},
      code: 200
    };
  } catch (e) {
    if (e.originalError && e.originalError.errno === 'ENOTFOUND') {
      return errorMessage(i18n.__('general.imageUpload'), 444);
    } else if (e.parent && e.parent.constraint === 'posts_type_id_fkey') {
      return errorMessage(i18n.__('posts.fk.typeId'), 404);
    } else if (e.parent && e.parent.constraint === 'banks_gym_id_fkey') {
      return errorMessage(i18n.__('posts.fk.gymId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Deletes a post
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
    let res = await Post.findOne({ where: { id, gymId, isDelete: false } });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('posts.notFound'), 404);
    }
    res = await res.update({ isDelete: true });
    return {
      success: {},
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
