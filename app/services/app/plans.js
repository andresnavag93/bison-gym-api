/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:plans');
// Models
const { Plan } = require('../../database/models');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Gets all plans registered
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
    let res = await Plan.findAll({
      attributes: [
        'id',
        'name',
        'currencyId',
        'gymId',
        'description',
        'price',
        'serial'
      ],
      where: { isDelete: false, gymId, isActive: true },
      include: [
        {
          association: 'hours',
          attributes: ['id', 'dayId', 'startHour', 'endHour']
        },
        {
          association: 'media',
          attributes: ['id', 'typeId', 'url']
        },
        {
          association: 'currency',
          attributes: ['id', 'name']
        }
      ],
      order: [['id', 'ASC']]
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Finds a plan by its id
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
    let res = await Plan.findOne({
      attributes: [
        'id',
        'name',
        'currencyId',
        'gymId',
        'description',
        'price',
        'serial'
      ],
      where: { id, gymId, isDelete: false, isActive: true },
      include: [
        {
          association: 'hours',
          required: false,
          where: { isDelete: false },
          attributes: ['id', 'dayId', 'startHour', 'endHour']
        },
        {
          association: 'media',
          required: false,
          where: { isDelete: false },
          attributes: ['id', 'typeId', 'url']
        },
        {
          association: 'currency',
          required: false,
          where: { isDelete: false },
          attributes: ['id', 'name']
        }
      ]
    });
    // Attribute not found
    if (res === null) {
      return errorMessage(i18n.__('plans.notFound'), 404);
    }
    return res;
  } catch (e) {
    debug('Error: ', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}
module.exports = {
  getAll,
  getById
};
