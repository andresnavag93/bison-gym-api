/* eslint-disable no-unused-vars */
'use strict';

// Configuration Files
const { emailConfig } = require('../../config/config');
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
// Emails
const nodeMailer = require('nodemailer');

/**
 * Gets all payments of one user registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllUserGroup(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let userGroupId = paramsValues[0];

    // Query
    let res = await PlansUsersGroup.findAll({
      attributes: ['id', 'cutDay', 'createdAt'],
      where: { isDelete: false, userGroupId },
      include: [
        {
          association: 'usersGroup',
          attributes: [],
          where: { gymId }
        },
        {
          association: 'payment',
          attributes: [
            'id',
            'statusId',
            'currencyId',
            'description',
            'date',
            'amount',
            'referenceNumber',
            'createdAt'
          ],
          where: { [Op.not]: { statusId: 24 } },
          include: [
            { association: 'bank', attributes: ['id', 'name'] },
            {
              association: 'currency',
              attributes: ['id', 'name']
            }
          ]
        },
        { association: 'plan', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
      // limit: 10
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets all payments woth status aprove registered
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
    let res = await PlansUsersGroup.findAll({
      attributes: ['id', 'cutDay', 'createdAt'],
      where: { isDelete: false },
      include: [
        {
          association: 'usersGroup',
          attributes: ['id'],
          where: { gymId },
          include: [
            { association: 'user', attributes: ['id', 'name', 'lastname'] }
          ]
        },
        {
          association: 'payment',
          where: { statusId: 24 },
          attributes: [
            'id',
            'statusId',
            'currencyId',
            'description',
            'date',
            'amount',
            'referenceNumber',
            'createdAt'
          ],
          include: [
            { association: 'bank', attributes: ['id', 'name'] },
            {
              association: 'currency',
              attributes: ['id', 'name']
            }
          ]
        },
        { association: 'plan', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
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
    let gymId = authHeader[1];
    let id = paramsValues[0];
    let userGroupId = paramsValues[1];

    // Query
    let res = await PlansUsersGroup.findOne({
      attributes: ['id', 'cutDay', 'createdAt'],
      where: { isDelete: false, id, userGroupId },
      include: [
        {
          association: 'usersGroup',
          attributes: [],
          where: { gymId }
        },
        {
          association: 'payment',
          attributes: [
            'id',
            'statusId',
            'currencyId',
            'date',
            'description',
            'amount',
            'referenceNumber',
            'createdAt'
          ],
          include: [
            { association: 'bank', attributes: ['id', 'name'] },
            {
              association: 'currency',
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
 * Create a payment
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let userGroupId = paramsValues[0];
    let object = paramsValues[1];

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
          association: 'usersGroup',
          attributes: [],
          where: { gymId }
        },
        {
          association: 'payment',
          // where: { statusId: 25 },
          attributes: ['id', 'statusId']
        },
        {
          association: 'usersGroup',
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
    if (cutDay < date) {
      cutDay = date.add(1, 'M');
    } else {
      cutDay = cutDay.add(1, 'M');
    }
    object.cutDay = cutDay.format();
    object.userGroupId = userGroupId;
    object.payment.userGroupId = userGroupId;
    object.payment.statusId = 25;
    // Deleting system attributes
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    // Deleting system attributes
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
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
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Update payment status
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function updateOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let id = paramsValues[0];
    let gymId = authHeader[1];
    let userGroupId = paramsValues[1];
    let object = paramsValues[2];

    let res = await PlansUsersGroup.findOne({
      attributes: ['id', 'userGroupId', 'planId', 'cutDay', 'createdAt'],
      where: { id, userGroupId, isDelete: false },
      include: [
        {
          association: 'usersGroup',
          attributes: [],
          where: { gymId }
        },
        {
          association: 'payment'
        },
        {
          association: 'usersGroup',
          include: [
            {
              association: 'user'
            }
          ]
        }
      ]
    });
    // Check last accepted payment
    if (res === null) {
      return errorMessage(i18n.__('payments.notFound'), 404);
    } else if (res.payment.statusId !== 24) {
      return errorMessage(i18n.__('payments.alreadyChange'), 444);
    } else if (!object.payment.statusId) {
      return errorMessage(i18n.__('payments.statusNotFound'), 444);
    } else if (object.payment.statusId in [25, 26]) {
      return errorMessage(i18n.__('payments.statusError'), 444);
    }
    let cutDay;
    if (object.payment.statusId === 25) {
      if (res.cutDay < res.createdAt) {
        cutDay = moment(res.createdAt)
          .utc()
          .add(1, 'M')
          .format();
      } else {
        cutDay = moment(res.cutDay)
          .utc()
          .add(1, 'M')
          .format();
      }
      //Update cutday
      await res.update({ cutDay });
    }
    //Update statusId
    await res.payment.update({ statusId: object.payment.statusId });

    // Send email with token
    let transporter = nodeMailer.createTransport(emailConfig);
    let status;

    if (object.payment.statusId === 25) {
      status = i18n.__('payments.status-payment.accepted');
    } else {
      status = i18n.__('payments.status-payment.rejected');
    }
    // Email Structure
    let mailOptions = {
      from: 'no-replay@bisonreserve.com',
      to: res.usersGroup.user.email,
      subject: `[Bison] - ${i18n.__('payments.status-payment.email-title')}`,
      html: `<br><b>${i18n.__('payments.status-payment.message.1')}</b><br><br>
      <b>${i18n.__('payments.status-payment.message.2')}</b><br>
      ${res.createdAt}<br><br><br>
      <b>${i18n.__('payments.status-payment.message.3')}</b><br>
     ${status}<br>`
    };
    // If email has been sent notify user
    res = await transporter.sendMail(mailOptions);

    return {
      success: {},
      code: 200
    };
  } catch (e) {
    debug('Error:', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}
module.exports = {
  getById,
  getAll,
  updateOne,
  createOne,
  getAllUserGroup
};
