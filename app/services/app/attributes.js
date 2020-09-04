/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:attributes');
// Models
const { Attribute } = require('../../database/models');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Gets all custom attributes registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllCustom(locale, authHeader, paramsValues) {
  try {
    i18n.setLocale(locale);
    //Params and Headers Values
    let attributeId = paramsValues[0];
    // Query
    let res = await Attribute.findAll({
      attributes: ['id', 'name', 'value'],
      where: { attributeId, isDelete: false },
      order: [['id', 'ASC']]
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

module.exports = {
  getAllCustom
};
