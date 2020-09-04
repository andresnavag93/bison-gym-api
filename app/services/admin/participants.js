/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:participants');
// Models
const { Participant } = require('../../database/models');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Finds participants of class by id
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getParticipantsById(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let classId = paramsValues[0];
    let gymId = authHeader[1];

    // Query
    let res = await Participant.findAll({
      attributes: ['id', 'updatedAt', 'createdAt', 'isWaiting', 'rating'],
      where: {
        isDelete: false,
        classId
      },
      include: [
        {
          association: 'usersGroup',
          where: { groupId: 10, isDelete: false, gymId },
          attributes: ['id', 'points', 'rating', 'admissionDate'],
          include: [
            {
              association: 'user',
              where: { isDelete: false },
              attributes: [
                'id',
                'name',
                'lastname',
                'document',
                'email',
                'picture',
                'anonymous'
              ]
            }
          ]
        }
      ],
      order: ['isWaiting', 'updatedAt']
    });

    return res;
  } catch (e) {
    debug('Error: ', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

module.exports = {
  getParticipantsById
};
