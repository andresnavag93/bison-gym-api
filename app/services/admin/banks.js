/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:banks');
// Utils
const shared = require('../shared');
// Schema
const schema = require('../../schemas/banks');
// Models
const { Bank } = require('../../database/models');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Gets all banks registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAll(locale, authHeader, paramsValues) {
  try {
    i18n.setLocale(locale);
    //Params and Headers Values
    let gymId = authHeader[1];
    // Query
    let res = await Bank.findAll({
      where: { isDelete: false, gymId },
      attributes: ['id', 'name', 'accountName', 'accountNumber', 'zelle'],
      order: [['id', 'ASC']]
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Finds a bank by its id
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getById(locale, authHeader, paramsValues) {
  try {
    i18n.setLocale(locale);
    //Params and Headers Values
    let id = paramsValues[0];
    let gymId = authHeader[1];
    // Query
    let res = await Bank.findOne({
      where: { id, gymId, isDelete: false },
      attributes: {
        include: [],
        exclude: ['isDelete']
      }
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('banks.notFound'), 404);
    }
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Creates an bank
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createOne(locale, authHeader, paramsValues) {
  try {
    i18n.setLocale(locale);
    //Params and Headers Values
    let object = paramsValues[0];
    let gymId = authHeader[1];
    object.gymId = gymId;
    //Check Schema
    schema['required'] = ['gymId', 'currencyId', 'name', 'isActive'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    // Deleting system attributes
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    // Insert in DB
    res = await Bank.create(object);
    return { success: { id: res.id }, code: 201 };
  } catch (e) {
    if (e.parent && e.parent.constraint === 'banks_currency_id_fkey') {
      return errorMessage(i18n.__('banks.fk.currencyId'), 404);
    } else if (e.parent && e.parent.constraint === 'banks_gym_id_fkey') {
      return errorMessage(i18n.__('banks.fk.gymId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Updates banks information
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function updateOne(locale, authHeader, paramsValues) {
  try {
    i18n.setLocale(locale);
    //Params and Headers Values
    let id = paramsValues[0];
    let object = paramsValues[1];
    let gymId = authHeader[1];
    object.gymId = gymId;
    //Check Schema
    delete schema['required'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    // Query
    res = await Bank.findOne({ where: { id, gymId, isDelete: false } });
    // Not Found
    if (res === null) {
      return errorMessage(i18n.__('banks.notFound'), 404);
    }
    // Deleting system attributes
    ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    // Update in DB
    res = await res.update(object);
    return { success: {}, code: 200 };
  } catch (e) {
    if (e.parent && e.parent.constraint === 'banks_currency_id_fkey') {
      return errorMessage(i18n.__('banks.fk.currencyId'), 404);
    } else if (e.parent && e.parent.constraint === 'banks_gym_id_fkey') {
      return errorMessage(i18n.__('banks.fk.gymId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Deletes an bank
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function deleteOne(locale, authHeader, paramsValues) {
  try {
    i18n.setLocale(locale);
    //Params and Headers Values
    let id = paramsValues[0];
    let gymId = authHeader[1];
    // Query
    let res = await Bank.findOne({ where: { id, gymId, isDelete: false } });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('banks.notFound'), 404);
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
