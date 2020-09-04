/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:rooms');
// Utils
const shared = require('../shared');
// Schema
const schema = require('../../schemas/rooms');
// Models
const { Room } = require('../../database/models');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Gets all rooms registered
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
    let res = await Room.findAll({
      where: { isDelete: false, gymId },
      attributes: ['id', 'name', 'capacity'],
      order: [['id', 'ASC']]
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
    let res = await Room.findOne({
      where: { id, gymId, isDelete: false },
      attributes: {
        include: [],
        exclude: ['isDelete']
      }
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('rooms.notFound'), 404);
    }
    return res;
  } catch (e) {
    debug('Error: ', e);
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

    //Check Schema // Verifies correct body request
    object.gymId = gymId;
    schema['required'] = ['capacity'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    // Inserts Gym in DB
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    res = await Room.create(object);
    return { success: { id: res.id }, code: 201 };
  } catch (e) {
    if (e.parent && e.parent.constraint === 'rooms_gym_id_fkey') {
      return errorMessage(i18n.__('rooms.fk.gymId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Updates posts information
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

    // Check Schema
    delete schema['required'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    // Query
    res = await Room.findOne({ where: { id, gymId, isDelete: false } });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('rooms.notFound'), 404);
    }

    object.gymId = gymId;
    ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    res = await res.update(object);
    return { success: {}, code: 200 };
  } catch (e) {
    if (e.parent && e.parent.constraint === 'rooms_gym_id_fkey') {
      return errorMessage(i18n.__('rooms.fk.gymId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

module.exports = {
  getAll,
  getById,
  createOne,
  updateOne
};
