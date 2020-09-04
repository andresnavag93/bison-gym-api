/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:penalties');
// Models
const { Penalty, Gym, Participant } = require('../../database/models');
// Sequelize Operations
const { Op } = require('sequelize');
// Better control of Date
const moment = require('moment-timezone');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Gets all users penalty registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAll(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let userGroupId = paramsValues[0];

    // Query
    let res = await Penalty.findAll({
      where: { isDelete: false, userGroupId },
      attributes: {
        include: [],
        exclude: ['isDelete']
      },
      order: [['createdAt', 'ASC']]
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Find a penalty
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
    let userGroupId = paramsValues[1];

    // Query
    let res = await Penalty.findOne({
      where: { id, isDelete: false, userGroupId },
      attributes: {
        include: [],
        exclude: ['isDelete']
      }
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('penalties.notFound'), 404);
    }

    return res;
  } catch (e) {
    debug('Error: ', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Creates penalty
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let userGroupId = paramsValues[0];
    let gymId = authHeader[1];
    // Query gym
    let gym = await Gym.findOne({
      where: { id: gymId, isDelete: false, isActive: true }
    });
    // Not Found
    if (gym === null) {
      return errorMessage(i18n.__('gyms.notFound'), 404);
      // Has penaltyDays set
    } else if (!gym.penaltyDays) {
      return errorMessage(i18n.__('penalties.penaltyDays'), 404);
    }

    let penalized = await Penalty.findAll({
      where: {
        endDate: { [Op.gte]: new Date() },
        isDelete: false
      },
      attributes: ['id', 'endDate'],
      order: [['endDate', 'DESC']],
      limit: 1
    });
    // Already penalized
    if (penalized[0]) {
      return errorMessage(i18n.__('users.penalized'), 404);
    }

    // Calculating next penalty date
    let currentDate = moment(new Date()).utc();
    let penaltyDate = moment(new Date())
      .utc()
      .add(gym.penaltyDays, 'days');
    let res = await Penalty.create({
      userGroupId,
      startDate: currentDate.format(),
      endDate: penaltyDate.format()
    });
    // Query future reservations for the user penilized
    res = await Participant.findAll({
      attributes: ['id', 'classId'],
      where: {
        isDelete: false,
        userGroupId
      },
      include: [
        {
          association: 'usersGroup',
          where: { groupId: 10, isDelete: false },
          attributes: ['id', 'groupId']
        },
        {
          association: 'class',
          where: {
            startDate: {
              [Op.gte]: currentDate.format()
            },
            endDate: {
              [Op.lte]: penaltyDate.format()
            },
            isDelete: false
          },
          attributes: ['id']
        }
      ],
      order: ['isWaiting', 'updatedAt']
    });
    // Penalized User we need to cancel all future reserves
    res.map(async function(participant) {
      if (participant.isWaiting === true) {
        participant.isWaiting = false;
        participant.isDelete = true;
        await participant.save();
      } else {
        participant.isWaiting = false;
        participant.isDelete = true;
        await participant.save();

        //Check class capacity
        let capacity;
        if (participant.class.capacity) {
          capacity = participant.class.capacity;
        } else if (participant.class.room) {
          capacity = participant.class.room.capacity;
        }

        let participants = await participant.class.getParticipants({
          where: {
            isDelete: false
          },
          include: [
            {
              association: 'usersGroup',
              where: { groupId: 10, isDelete: false }
            }
          ],
          order: ['isWaiting', 'updatedAt']
        });
        //Capacity is greater than

        let lastParticipant = participants[capacity - 1];
        if (lastParticipant !== undefined && lastParticipant !== null) {
          lastParticipant.isWaiting = false;
          await lastParticipant.save();
        }
      }
    });

    return { success: { id: res.id }, code: 201 };
  } catch (e) {
    debug('Error:', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Deletes an penalty
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
    let userGroupId = paramsValues[1];

    // Gets current gym data
    let res = await Penalty.findOne({
      where: { id, isDelete: false, userGroupId }
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('penalties.notFound'), 404);
    }
    res = await res.update({ isDelete: true });
    return {
      success: {},
      code: 200
    };
  } catch (e) {
    debug('Error:', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

module.exports = {
  getAll,
  getById,
  createOne,
  deleteOne
};
