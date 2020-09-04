/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:disciplines');
// Models
const { Discipline } = require('../../database/models');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

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
      attributes: ['id', 'rating', 'description', 'name'],
      where: { isDelete: false, gymId, isActive: true },
      include: [
        {
          association: 'media',
          attributes: ['id', 'url', 'typeId']
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
      attributes: ['id', 'rating', 'description', 'name'],
      where: { id, gymId, isActive: true, isDelete: false },
      include: [
        {
          association: 'media',
          attributes: ['id', 'url', 'typeId']
        }
      ]
    });

    // Attribute not found
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

module.exports = {
  getById,
  getAll
};
