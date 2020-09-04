/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:payments');
// Utils
const shared = require('../shared');
// Schema
const schema = require('../../schemas/payments');
// Models
const {
  Payment,
  PlansUsersGroup,
  UsersGroup
} = require('../../database/models');
// Better control of Date
const moment = require('moment-timezone');
// Sequelize Operations
const { Op } = require('sequelize');

// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Gets all payments registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAll(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let userGroupId = authHeader[2];

    // Query
    let res = await PlansUsersGroup.findAll({
      attributes: ['id', 'cutDay', 'createdAt'],
      where: { isDelete: false, userGroupId },
      include: [
        {
          association: 'payment',
          attributes: [
            'id',
            'statusId',
            'currencyId',
            'description',
            'amount',
            'referenceNumber',
            'createdAt'
          ],
          include: [
            {
              association: 'bank',
              attributes: ['id', 'name']
            }
          ]
        },
        { association: 'plan', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Finds a payment by its id
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getById(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    //let gymId = authHeader[1];
    let id = paramsValues[0];
    let userGroupId = authHeader[2];

    // Query
    let res = await PlansUsersGroup.findOne({
      attributes: ['id', 'cutDay'],
      where: { isDelete: false, id, userGroupId },
      include: [
        {
          association: 'payment',
          attributes: [
            'id',
            'statusId',
            'currencyId',
            'description',
            'amount',
            'referenceNumber',
            'createdAt'
          ],
          include: [
            {
              association: 'bank',
              attributes: ['id', 'name']
            }
          ]
        },
        { association: 'plan', attributes: ['id', 'name'] }
      ]
    });

    // Not found
    if (res === null) {
      return errorMessage(i18n.__('payments.notFound'), 404);
    }

    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Creates a payment
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let object = paramsValues[0];
    let userGroupId = authHeader[2];

    // Check Schema
    if (!object.planId) {
      return errorMessage(i18n.__('payments.planIdNotFound'), 444);
    }
    schema['required'] = ['date', 'amount'];
    var res = shared.checkSchema(object['payment'], schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    //Query
    let plan = await PlansUsersGroup.findOne({
      attributes: ['id', 'userGroupId', 'planId', 'cutDay'],
      where: { userGroupId, isDelete: false },
      include: [
        {
          association: 'payment',
          // where: { statusId: 25 },
          attributes: ['id', 'statusId']
        },

        {
          association: 'usersGroup',
          where: { isActive: true, isDelete: false, groupId: 10 },
          attributes: ['id'],
          include: [{ association: 'gym', attributes: ['id', 'preThankDays'] }]
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 1
    });
    // Check last accepted payment
    if (plan === null) {
      return errorMessage(i18n.__('payments.lastPaymentNotExists'), 404);
    } else if (plan.payment.statusId === 24) {
      return errorMessage(i18n.__('payments.notApprovedYet'), 444);
    }
    // Check cut day
    let cutDay = moment(plan.cutDay).utc();
    let date = moment(new Date()).utc();
    let preThankDays = plan.usersGroup.gym.preThankDays;
    if (cutDay.diff(date, 'days') > preThankDays) {
      return errorMessage(i18n.__('payments.toEarlyToPay'), 404);
    }
    object.cutDay = cutDay.format();
    object.userGroupId = userGroupId;
    object.payment.userGroupId = userGroupId;
    object.payment.statusId = 24;
    // Deleting system attributes
    ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    // Deleting system attributes
    ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object['payment'][key];
    });
    res = await PlansUsersGroup.create(object, {
      include: [
        {
          association: 'payment'
        }
      ]
    });

    //Verify if exists plan change
    if (plan.planId !== object.planId) {
      let user = await UsersGroup.findOne({
        where: { id: userGroupId, isDelete: false, isActive: true },
        include: [
          {
            association: 'participants',
            required: false,
            where: { isDelete: false },
            include: [
              {
                association: 'class',
                where: { startDate: { [Op.gte]: new Date() } }
              }
            ]
          }
        ]
      });
      if (user) {
        // Cancel future reservetions
        let reserves = user.participants;
        reserves.map(async function(participant) {
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
                  where: { groupId: 10 }
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
      }
    }
    return { success: { id: res.id }, code: 201 };
  } catch (e) {
    debug('Error:', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

module.exports = {
  getById,
  getAll,
  createOne
};
