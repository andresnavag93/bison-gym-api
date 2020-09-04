/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:attributes');
// Utils
const shared = require('../shared');
// Schema
const schema = require('../../schemas/attributes');
// Models
const { Attribute } = require('../../database/models');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Gets all Attributes registered (Only Root)
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAll(locale, authHeader, paramsValues) {
  try {
    i18n.setLocale(locale);
    // Query
    let res = await Attribute.findAll({
      attributes: {
        include: [],
        exclude: ['isDelete']
      },
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
 * Finds an attribute by its id
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getById(locale, authHeader, paramsValues) {
  try {
    i18n.setLocale(locale);
    //Params and Headers Values
    let id = paramsValues[0];
    // Query
    let res = await Attribute.findByPk(id, {
      attributes: {
        include: [],
        exclude: ['isDelete']
      },
      where: { isDelete: false }
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('attributes.notFound'), 404);
    }
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Creates an attribute
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createOne(locale, authHeader, paramsValues) {
  try {
    i18n.setLocale(locale);
    //Params and Headers Values
    let object = paramsValues[0];
    //Check Schema
    schema['required'] = ['name'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    // Deleting system attributes
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    // Insert in DB
    res = await Attribute.create(object);
    return { success: { id: res.id }, code: 201 };
  } catch (e) {
    if (e.parent && e.parent.constraint === 'attributes_attribute_id_fkey') {
      return errorMessage(i18n.__('attributes.fk.attributeId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Updates attributes information
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
    //Check Schema
    delete schema['required'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    // Query
    res = await Attribute.findByPk(id, { isDelete: false });
    // Not Found
    if (res === null) {
      return errorMessage(i18n.__('attributes.notFound'), 404);
    }
    // Deleting system keys
    ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    // Update in DB
    res = await res.update(object);
    return {
      success: {},
      code: 200
    };
  } catch (e) {
    if (e.parent && e.parent.constraint === 'attributes_attribute_id_fkey') {
      return errorMessage(i18n.__('attributes.fk.attributeId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Deletes an attribute
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function deleteOne(locale, authHeader, paramsValues) {
  try {
    i18n.setLocale(locale);
    let id = paramsValues[0];
    // Query
    let res = await Attribute.findOne({ where: { id, isDelete: false } });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('attributes.notFound'), 404);
    }
    // Delete == Update isDelete: true
    res = await res.update({ isDelete: true });
    return { success: {}, code: 200 };
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets all custom attributes registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllCustom(locale, authHeader, paramsValues) {
  try {
    let attributeId = paramsValues[0];
    i18n.setLocale(locale);
    // Query
    let res = await Attribute.findAll({
      attributes: {
        include: [],
        exclude: ['isDelete']
      },
      where: { attributeId },
      order: [['id', 'ASC']]
    });
    return res;
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
  deleteOne,
  getAllCustom
};
