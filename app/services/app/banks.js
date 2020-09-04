/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:banks');
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
      attributes: ['id', 'name'],
      where: { isDelete: false, gymId, isActive: true },
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
      attributes: [
        'id',
        'name',
        'accountName',
        'document',
        'accountNumber',
        'zelle',
        'currencyId'
      ],
      where: { id, gymId, isActive: true, isDelete: false }
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

module.exports = {
  getById,
  getAll
};
