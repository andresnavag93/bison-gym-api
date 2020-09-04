/* eslint-disable no-unused-vars */
'use strict';

// Configuration Files
const config = require('../../config/config');
// Internationalization
const i18n = require('../../i18n/i18n');
// Security
// Token
const auth = require('../../auth/admin/auth');
// Password hashing
const hashing = require('../../hashing/hashing');
// Verifcation Code Generator
const crypto = require('crypto');
// Models
const { User, UsersGroup, SecurityCode } = require('../../database/models');
// Console Debug Information
const debug = require('debug')('mercury-backend:controllers:auth');
// Shared Tools
const shared = require('../shared');
// Schemas
const Login = require('../../schemas/login');
const SendCode = require('../../schemas/sendCode');
const VerifyCode = require('../../schemas/verifyCode');
const ResetPassword = require('../../schemas/resetPassword');
// Better control of Date
const moment = require('moment-timezone');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');
// Sequelize Operations
const { Op } = require('sequelize');
// Emails
const nodeMailer = require('nodemailer');

/**
 * User login
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function login(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    var login = paramsValues[0];

    // Objects for database queries
    var res = null;
    var user = null;
    // var permissions = null;

    // Verifies correct body request
    res = shared.checkSchema(login, Login);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    // Queries

    // Gets user if it exists
    user = await User.findOne({
      where: { email: login.email },
      include: [
        {
          association: 'usersGroups',
          attribute: ['id', 'isActive', 'isDelete', 'groupId'],
          include: [
            {
              association: 'gym',
              attribute: ['id', 'timezone', 'isActive', 'isDelete']
            }
          ],
          limit: 1
        }
      ]
    });
    if (user === null) {
      return errorMessage(i18n.__('users.emailNotFound'), 404);
    } else if (user.isDelete) {
      return errorMessage(i18n.__('users.isDelete'), 404);
    } else if (
      user.usersGroups &&
      user.usersGroups[0] &&
      !user.usersGroups[0].isActive
    ) {
      return errorMessage(i18n.__('users.noActive'), 404);
    } else if (user.usersGroups[0].isDelete) {
      return errorMessage(i18n.__('users.isDelete'), 404);
    } else if (user.usersGroups[0].gym && !user.usersGroups[0].gym.isActive) {
      return errorMessage(i18n.__('gyms.noActive'), 404);
    } else if (user.usersGroups[0].gym.isDelete) {
      return errorMessage(i18n.__('gyms.isDelete'), 404);
    } else if (
      user.usersGroups[0].groupId === 12 ||
      user.usersGroups[0].groupId === 13
    ) {
      return errorMessage(i18n.__('users.notAuthorized'), 404);
    }

    // Checks password with hash stored
    var comparison = await hashing.comparePassword(
      login['password'],
      user['password']
    );

    // Returns error if password doesn't match
    if (!comparison)
      return errorMessage(i18n.__('users.incorrectComparission'), 404);

    // Builds payload for token
    var payload = {
      userGroupId: user.usersGroups[0].id,
      gymId: user.usersGroups[0].gymId,
      timezone: user.usersGroups[0].gym.timezone,
      groupId: user.usersGroups[0].groupId,
      permissions: [user.usersGroups[0].groupId]
    };

    // Builds token
    var token = await auth.sign(payload, config.JWT_KEY_APP);

    // Builds successfull response
    return {
      success: {
        token,
        userGroupId: payload.userGroupId,
        gymId: payload.gymId,
        timezone: payload.timezone,
        groupId: payload.groupId
      },
      code: 200
    };
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * User logout
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function logout(locale, authHeader, paramsValues) {
  try {
    let gymId = authHeader[1];
    i18n.setLocale(locale);
    return { success: {}, code: 200 };
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Sends a code with a hash to start resetting the password
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function sendCode(locale, authHeader, paramsValues) {
  // try {
  // Set user locale
  i18n.setLocale(locale);

  // Objects for database queries
  var res = null;
  var email = paramsValues[0];

  // Verifies correct body request
  SendCode['required'] = ['email'];
  res = shared.checkSchema(email, SendCode);
  if (typeof res === 'object') return { error: Object.values(res.error)[0] };

  // Replaces unique attribute
  email = email['email'];

  // Checks if user exists
  var user = await User.findOne({
    where: { email },
    include: [
      {
        association: 'usersGroups',
        attribute: ['id', 'isActive', 'isDelete', 'groupId'],
        include: [
          {
            association: 'gym',
            attribute: ['id', 'timezone', 'isActive', 'isDelete']
          }
        ],
        limit: 1
      }
    ]
  });
  if (user === null) {
    return errorMessage(i18n.__('users.emailNotFound'), 404);
  } else if (user.isDelete) {
    return errorMessage(i18n.__('users.isDelete'), 404);
  } else if (
    user.usersGroups &&
    user.usersGroups[0] &&
    !user.usersGroups[0].isActive
  ) {
    return errorMessage(i18n.__('users.noActive'), 404);
  } else if (user.usersGroups[0].isDelete) {
    return errorMessage(i18n.__('users.isDelete'), 404);
  } else if (user.usersGroups[0].gym && !user.usersGroups[0].gym.isActive) {
    return errorMessage(i18n.__('gyms.noActive'), 404);
  } else if (user.usersGroups[0].gym.isDelete) {
    return errorMessage(i18n.__('gyms.isDelete'), 404);
  } else if (
    user.usersGroups[0].groupId === 12 ||
    user.usersGroups[0].groupId === 13
  ) {
    return errorMessage(i18n.__('users.notAuthorized'), 404);
  }
  let serial = null;
  while (!serial) {
    let dateExpired = moment(new Date())
      .utc()
      .add(3, 'm')
      .format();
    try {
      // serial = Number((Math.random() * (999999 - 0) + 0).toFixed(0));
      let min = Math.ceil(100000);
      let max = Math.floor(999999);
      serial = Number(Math.floor(Math.random() * (max - min + 1)) + min);
      res = await SecurityCode.create({
        serial,
        startDate: new Date(),
        endDate: dateExpired,
        typeId: 23,
        userGroupId: user.usersGroups[0].id
      });
    } catch (e) {
      serial = null;
    }
  }

  // Send email with token
  let transporter = nodeMailer.createTransport(config.emailConfig);
  // Email Structure
  let mailOptions = {
    from: 'no-replay@bisonreserve.com',
    to: email,
    subject: `[Bison] - ${i18n.__('auth.password-recovery.code.email-title')}`,
    html: `<br><b>${i18n.__(
      'auth.password-recovery.code.message.1'
    )}</b> <br> ${serial}<br>`
  };
  // If email has been sent notify user
  res = await transporter.sendMail(mailOptions);

  return {
    success: { serial },
    code: 200
  };
}

/**
 * Verifies if there is a real code in DB
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function verifyCode(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);

    // Objects for database queries
    var res = null;
    var code = paramsValues[0];

    // Verifies correct body request
    VerifyCode['required'] = ['serial'];
    res = shared.checkSchema(code, VerifyCode);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    // Verifies if code exists
    res = await SecurityCode.findOne({
      where: {
        serial: code.serial,
        endDate: { [Op.gte]: new Date() },
        typeId: 23,
        isUsed: false
      },
      include: [
        {
          association: 'usersGroup',
          where: {
            isActive: true,
            isDelete: false,
            [Op.or]: [{ groupId: 10 }, { groupId: 11 }]
          }
        }
      ]
    });
    if (res === null) {
      return errorMessage(i18n.__('auth.password-recovery.code.invalid'), 404);
    }
    return {
      success: { serial: res.serial },
      code: 200
    };
  } catch (e) {
    // Uncaugth error
    debug('Error:', e);
    return { error: { msg: i18n.__('general.unexpected') }, code: 444 };
  }
}

/**
 * Resets user password
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function resetPassword(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);

    // Objects for database queries
    var res = null;
    var object = paramsValues[0];

    // Verifies correct body request
    ResetPassword['required'] = ['serial', 'password', 'confirmPassword'];
    res = shared.checkSchema(object, ResetPassword);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    // Verifies if code exists
    res = await SecurityCode.findOne({
      where: {
        serial: object.serial,
        endDate: { [Op.gte]: new Date() },
        typeId: 23,
        isUsed: false
      },
      include: [
        {
          association: 'usersGroup',
          where: {
            isActive: true,
            isDelete: false,
            [Op.or]: [{ groupId: 10 }, { groupId: 11 }]
          },
          include: [
            {
              association: 'user',
              where: {
                isDelete: false
              }
            }
          ]
        }
      ]
    });
    if (res === null) {
      return errorMessage(i18n.__('auth.password-recovery.code.invalid'), 404);
    }

    // Check that passwords are equal
    if (object['password'] !== object['confirmPassword']) {
      return { error: { msg: i18n.__('users.password.not-match') }, code: 444 };
    }
    object['password'] = await hashing.encrypt(object['password']);

    await res.update({ isUsed: true });
    await res.usersGroup.user.update({ password: object['password'] });
    return {
      success: {},
      code: 200
    };
  } catch (e) {
    // Uncaugth error
    debug('Error:', e);
    return { error: { msg: i18n.__('general.unexpected') }, code: 444 };
  }
}

module.exports = {
  login,
  logout,
  sendCode,
  verifyCode,
  resetPassword
};
