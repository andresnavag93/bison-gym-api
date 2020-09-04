/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:gyms');
// Models
const { Gym } = require('../../database/models');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Finds a gym by its id
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getById(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let userGroupId = authHeader[2];
    // Query
    let res = await Gym.findOne({
      attributes: [
        'id',
        'name',
        'description',
        'phone1',
        'phone2',
        'latitude',
        'longitude',
        'rating',
        'logo',
        'timezone',
        'twitter',
        'instagram',
        'facebook',
        'linkedin'
      ],
      where: { id: gymId, isDelete: false, isActive: true },
      include: [
        {
          association: 'media',
          attributes: ['id', 'url', 'typeId']
        },
        {
          association: 'usersGroups',
          required: false,
          where: { id: userGroupId, groupId: 10, isDelete: false },
          attributes: ['id', 'gymRating']
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

module.exports = {
  getById
};
