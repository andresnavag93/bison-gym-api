/* eslint-disable no-unused-vars */
'use strict';

// Configuration Files
const { emailConfig } = require('../../config/config');
// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:users');
// Utils
const shared = require('../shared');
// Schema
const usersGroupsSchema = require('../../schemas/usersGroups');
const usersSchema = require('../../schemas/users');
const paymentsSchema = require('../../schemas/payments');
// Better control of Date
const moment = require('moment-timezone');
// Models
const {
  User,
  UsersGroup,
  PlansUsersGroup,
  DisciplinesUsersGroup,
  Media
} = require('../../database/models');
// Encrypt Password
const hashing = require('../../hashing/hashing');
// Sequelize Operations
const { Op } = require('sequelize');
// AWS S3
const {
  uploadImageToAWS,
  deleteImageFromAWS,
  extractKeyFromUrl
} = require('../../utils/awsServices');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');
// Config
const { AWS } = require('../../config/config');
// Code generator
const { codeGenerator } = require('../../utils/codeGenerator');
// Emails
const nodeMailer = require('nodemailer');

/**
 * Gets all users registered
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
    let res = await UsersGroup.findAll({
      attributes: ['id', 'isActive', 'groupId', 'gymId'],
      where: {
        isDelete: false,
        gymId,
        [Op.not]: { [Op.or]: [{ groupId: 12 }, { groupId: 13 }] }
      },
      include: [
        {
          association: 'user',
          where: { isDelete: false },
          attributes: ['id', 'name', 'lastname', 'document', 'email']
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
 * Finds an user by its id
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
    let res = await UsersGroup.findOne({
      where: { id, gymId, isDelete: false },
      attributes: [
        'id',
        'points',
        'rating',
        'gymId',
        'admissionDate',
        'isActive',
        'groupId'
      ],
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
            'anonymous',
            'cellphone',
            'twitter',
            'instagram',
            'facebook',
            'linkedin',
            'description',
            'birthday',
            'address'
          ]
        },
        {
          association: 'media',
          attributes: ['id', 'url', 'typeId']
        },
        {
          association: 'plansUsersGroups',
          attributes: ['id', 'cutDay'],
          include: [
            {
              association: 'plan',
              attributes: ['id', 'name']
            }
          ],
          order: [['createdAt', 'DESC']],
          limit: 1
        },
        {
          association: 'penalties',
          where: {
            endDate: { [Op.gte]: new Date() },
            isDelete: false
          },
          attributes: ['id', 'endDate'],
          order: [['endDate', 'DESC']],
          limit: 1
        }
      ]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('users.notFound'), 404);
    }
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets all coaches registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllCoaches(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];

    let res = await UsersGroup.findAll({
      attributes: [
        'id',
        'points',
        'rating',
        'gymId',
        'admissionDate',
        'isActive',
        'groupId'
      ],
      where: { isDelete: false, gymId, groupId: 11 },
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
            'anonymous',
            'cellphone',
            'twitter',
            'instagram',
            'facebook',
            'linkedin',
            'description',
            'birthday',
            'address'
          ]
        },
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
 * Gets all clients registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllClients(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];

    let res = await UsersGroup.findAll({
      attributes: [
        'id',
        'points',
        'rating',
        'gymId',
        'admissionDate',
        'isActive',
        'groupId'
      ],
      where: { isDelete: false, gymId, groupId: 10 },
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
            'anonymous',
            'cellphone',
            'twitter',
            'instagram',
            'facebook',
            'linkedin',
            'description',
            'birthday',
            'address'
          ]
        },
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
 * Gets all coaches by discipline registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllCoachesByDiscipline(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let disciplineId = paramsValues[0];

    //Query
    let res = await UsersGroup.findAll({
      attributes: [
        'id',
        'points',
        'rating',
        'gymId',
        'admissionDate',
        'isActive',
        'groupId'
      ],
      where: { isActive: true, isDelete: false, gymId, groupId: 11 },
      include: [
        {
          association: 'disciplinesUsersGroup',
          attributes: [],
          where: { disciplineId }
        },
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
            'anonymous',
            'cellphone',
            'twitter',
            'instagram',
            'facebook',
            'linkedin',
            'description',
            'birthday',
            'address'
          ]
        },
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
 * Creates an user
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    var object = paramsValues[0];
    let gymId = authHeader[1];
    var upload, uploadMedia, user, usergroup;

    //Check Schema
    object.gymId = gymId;
    usersGroupsSchema['required'] = ['groupId', 'isActive'];
    var res = shared.checkSchema(object, usersGroupsSchema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    usersSchema['required'] = [
      'name',
      'lastname',
      'document',
      'email',
      'cellphone',
      'birthday',
      'anonymous'
    ];

    res = shared.checkSchema(object['user'], usersSchema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    if (object.user.birthday && new Date(object.user.birthday) > new Date()) {
      return errorMessage(i18n.__('users.incorrectBirthday'), 444);
    }

    if (![10, 11].includes(object.groupId)) {
      return errorMessage(i18n.__('users.incorrectRole'), 444);
    }

    if (object.groupId === 10) {
      if (!object.plan) {
        return errorMessage(i18n.__('payments.planNotFound'), 444);
      }
      if (!object.plan.planId) {
        return errorMessage(i18n.__('payments.planIdNotFound'), 444);
      }
      paymentsSchema['required'] = ['date', 'amount'];
      res = shared.checkSchema(object['plan']['payment'], paymentsSchema);
      if (typeof res === 'object')
        return { error: Object.values(res.error)[0] };
    }

    //Check new image for picture
    if (object.user.base64) {
      upload = await uploadImageToAWS(object.user.base64, '/users');
      if (upload.Location) {
        object.user.picture = upload.Location;
      }
      delete object.user.base64;
    } else {
      object.user.picture = AWS.S3_URL + 'no-user-available.jpg';
    }
    //If new user if Coach
    if (object.groupId === 11) {
      //Check new image for media
      if (object.media && object.media.length > 0) {
        if (object.media[0].base64) {
          uploadMedia = await uploadImageToAWS(
            object.media[0].base64,
            '/users'
          );
          if (uploadMedia.Location) {
            object.media[0].url = uploadMedia.Location;
          }
          delete object.media[0].base64;
        } else {
          object.media[0].url = AWS.S3_URL + 'no-image-available.png';
        }
        ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
          delete object.media[0][key];
        });
      } else {
        object.media = [
          {
            typeId: 31,
            url: AWS.S3_URL + 'no-image-available.png'
          }
        ];
      }
    } else {
      delete object.media;
    }
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object['user'][key];
    });
    // Inserts User, UserGroup in DB
    let password = codeGenerator(8);
    let passwordEncrypt = await hashing.encrypt(password);
    object.rating = 5;
    object.ratingCount = null;
    object.ratingSum = null;
    object.user.password = passwordEncrypt;
    object.admissionDate = new Date();
    user = await User.create(object['user']);
    object.userId = user.id;
    usergroup = await UsersGroup.create(object, {
      include: [
        {
          association: 'media'
        }
      ]
    });
    // Inserts Plan and Payment in database
    if (object.groupId === 10) {
      let plan = object.plan;
      plan.cutDay = moment(new Date())
        .utc()
        .add(1, 'M')
        .format();
      plan.userGroupId = usergroup.id;
      plan.payment.userGroupId = usergroup.id;
      plan.payment.statusId = 25;
      await PlansUsersGroup.create(plan, {
        include: [
          {
            association: 'payment'
          }
        ]
      });
    }

    // Send email with token
    let transporter = nodeMailer.createTransport(emailConfig);
    // Email Structure
    let mailOptions = {
      from: 'no-replay@bisonreserve.com',
      to: object.user.email,
      subject: `[Bison] - ${i18n.__('auth.new-register.email-title')}`,
      html: `<br><b>${i18n.__('auth.new-register.message.1')}</b><br>
     ${object.user.email}<br><br><br>
    <b>${i18n.__('auth.new-register.message.2')}</b><br>
     ${password}<br>`
    };
    // If email has been sent notify user
    res = await transporter.sendMail(mailOptions);

    return { success: { id: usergroup.id }, code: 201 };
  } catch (e) {
    if (upload) {
      await deleteImageFromAWS(upload.key);
    }
    if (uploadMedia) {
      await deleteImageFromAWS(uploadMedia.key);
    }
    if (user) {
      user.destroy();
    }
    if (usergroup) {
      usergroup.destroy();
    }
    if (e.originalError && e.originalError.errno === 'ENOTFOUND') {
      return errorMessage(i18n.__('general.imageUpload'), 444);
    } else if (e.parent && e.parent.constraint === 'users_email_key') {
      return errorMessage(i18n.__('users.constrainst.uniqueEmail'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_group_id_fkey'
    ) {
      return errorMessage(i18n.__('users.fk.groupId'), 404);
    } else if (e.parent && e.parent.constraint === 'users_groups_gym_id_fkey') {
      return errorMessage(i18n.__('users.fk.gymId'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_user_id_fkey'
    ) {
      return errorMessage(i18n.__('users.fk.userId'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_group_id_gym_id_user_id_key'
    ) {
      return errorMessage(i18n.__('users.constrainst.uniqueGroupUserGym'), 404);
    } else {
      debug('Error:', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Updates user information
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function updateOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let id = paramsValues[0];
    let object = paramsValues[1];
    let gymId = authHeader[1];
    var upload, uploadMedia;
    object.gymId = gymId;
    //Check Schema
    delete usersGroupsSchema['required'];
    var res = shared.checkSchema(object, usersGroupsSchema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    delete usersSchema['required'];
    res = shared.checkSchema(object['user'], usersSchema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    if (object.user.birthday && new Date(object.user.birthday) > new Date()) {
      return errorMessage(i18n.__('users.incorrectBirthday'), 444);
    }

    // Gets current data
    res = await UsersGroup.findOne({
      where: { id, gymId, isDelete: false, isActive: true },
      include: [
        { association: 'user', where: { isDelete: false } },
        { association: 'media' },
        {
          association: 'participants',
          required: false,
          where: { isDelete: false },
          include: [
            {
              association: 'class',
              where: { startDate: { [Op.gte]: new Date() }, isDelete: false },
              include: [{ association: 'room' }]
            }
          ]
        }
      ]
    });
    // User not found
    if (res === null) {
      return errorMessage(i18n.__('users.notFound'), 404);
    }
    // Cannot change user group
    if (object.groupId && object.groupId !== res.groupId) {
      return errorMessage(i18n.__('users.changeGroupId'), 404);
    }
    if (object.isActive === undefined || object.isActive === null) {
      object.isActive = true;
    }
    // Inactive User we need to cancel all future reserves
    if (res.groupId === 10) {
      if (object.isActive === false && res.isActive) {
        let reserves = res.participants;
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
              if (lastParticipant.isWaiting) {
                lastParticipant.isWaiting = false;
                await lastParticipant.save();
              }
            }
          }
        });
      }
    }
    //Check if exists new picture
    var key;
    if (object.user.picture) {
      key = extractKeyFromUrl(object.user.picture, 'no-user-available.jpg');
    }
    delete object.user.picture;
    if (object.user.base64) {
      upload = await uploadImageToAWS(object.user.base64, '/users', key);
      if (upload.Location) {
        object.user.picture = upload.Location;
      }
      delete object.user.base64;
    }
    let groupId = res.groupId;
    //Verify if user is coach
    if (groupId === 11) {
      //Check if exists new media
      key = null;
      if (res.media[0]) {
        key = extractKeyFromUrl(res.media[0].url, 'no-image-available.png');
      }
      delete object.media[0].url;
      if (object.media[0].base64) {
        uploadMedia = await uploadImageToAWS(
          object.media[0].base64,
          '/users',
          key
        );
        if (uploadMedia.Location) {
          object.media[0].url = uploadMedia.Location;
        }
        delete object.media[0].base64;
      }
      //Delete systems attributes
      ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
        delete object.media[0][key];
      });
      object.media[0].typeId = 31;
    } else {
      delete object.media;
    }
    //Delete systems attributes
    [
      'isDelete',
      'createdAt',
      'updatedAt',
      'points',
      'rating',
      'ratingSum',
      'ratingCount',
      'admissionDate'
    ].forEach(function(key) {
      delete object[key];
    });
    res = await res.update(object);
    //Delete systems attributes
    ['password', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object['user'][key];
    });
    //Update in DB
    await res.user.update(object['user']);
    if (groupId === 11) {
      if (res.media[0].id) {
        await res.media[0].update(object['media'][0]);
      } else {
        object['media'][0].userGroupId = res.id;
        await Media.create(object['media'][0]);
      }
    }
    return { success: {}, code: 200 };
  } catch (e) {
    if (e.originalError && e.originalError.errno === 'ENOTFOUND') {
      return errorMessage(i18n.__('general.imageUpload'), 444);
    } else if (e.parent && e.parent.constraint === 'users_email_key') {
      return errorMessage(i18n.__('users.constrainst.uniqueEmail'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_group_id_fkey'
    ) {
      return errorMessage(i18n.__('users.fk.groupId'), 404);
    } else if (e.parent && e.parent.constraint === 'users_groups_gym_id_fkey') {
      return errorMessage(i18n.__('users.fk.gymId'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_user_id_fkey'
    ) {
      return errorMessage(i18n.__('users.fk.userId'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_group_id_gym_id_user_id_key'
    ) {
      return errorMessage(i18n.__('users.constrainst.uniqueGroupUserGym'), 404);
    } else {
      debug('Error:', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Deletes a user
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
    // Query
    let res = await UsersGroup.findOne({
      where: { id, gymId },
      include: [
        {
          association: 'participants',
          required: false,
          where: { isDelete: false },
          include: [
            {
              association: 'class',
              where: { startDate: { [Op.gte]: new Date() }, isDelete: false },
              include: [{ association: 'room' }]
            }
          ]
        }
      ]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('users.notFound'), 404);
    }
    // Delete == Update isDelete: true
    res = await res.update({ isDelete: true });

    // Inactive User we need to cancel all future reserves
    if (res.groupId === 10) {
      let reserves = res.participants;
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
            if (lastParticipant.isWaiting) {
              lastParticipant.isWaiting = false;
              await lastParticipant.save();
            }
          }
        }
      });
    }
    return { success: {}, code: 200 };
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Put all coach of by discipline by its id
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function putAllCoachesByDiscipline(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let object = paramsValues[1];
    let disciplineId = paramsValues[0];

    await DisciplinesUsersGroup.destroy({ where: { disciplineId } });
    object.map(async function(e) {
      await DisciplinesUsersGroup.create({ disciplineId, userGroupId: e.id });
    });
    return {
      success: {},
      code: 200
    };
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets all users registered by Root
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllRoot(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = paramsValues[0];
    // Query
    let res = await UsersGroup.findAll({
      attributes: ['id', 'isActive', 'groupId', 'gymId'],
      where: {
        isDelete: false,
        gymId,
        groupId: 13
      },
      include: [
        {
          association: 'user',
          where: { isDelete: false },
          attributes: ['id', 'name', 'lastname', 'document', 'email']
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
 * Finds an user by its id by Root
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getByIdRoot(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let id = paramsValues[0];
    let gymId = paramsValues[1];

    // Query
    let res = await UsersGroup.findOne({
      where: { id, gymId, groupId: 13, isDelete: false },
      attributes: [
        'id',
        'points',
        'rating',
        'admissionDate',
        'isActive',
        'gymId',
        'groupId'
      ],
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
            'anonymous',
            'cellphone',
            'twitter',
            'instagram',
            'facebook',
            'linkedin',
            'description',
            'birthday',
            'address'
          ]
        }
      ]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('users.notFound'), 404);
    }
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Creates an user
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createOneRoot(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    var object = paramsValues[0];
    let gymId = paramsValues[1];
    var user, usergroup;
    var upload;

    //Check Schema
    object.gymId = gymId;
    usersGroupsSchema['required'] = ['isActive'];
    var res = shared.checkSchema(object, usersGroupsSchema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    usersSchema['required'] = [
      'name',
      'lastname',
      'document',
      'email',
      'cellphone',
      'birthday',
      'anonymous'
    ];

    res = shared.checkSchema(object['user'], usersSchema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    if (object.user.birthday && new Date(object.user.birthday) > new Date()) {
      return errorMessage(i18n.__('users.incorrectBirthday'), 444);
    }

    //Check new image for picture
    if (object.user.base64) {
      upload = await uploadImageToAWS(object.user.base64, '/users');
      if (upload.Location) {
        object.user.picture = upload.Location;
      }
      delete object.user.base64;
    } else {
      object.user.picture = AWS.S3_URL + 'no-user-available.jpg';
    }

    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object['user'][key];
    });
    // Inserts User, UserGroup in DB
    let password = codeGenerator(8);
    let passwordEncrypt = await hashing.encrypt(password);
    object.rating = null;
    object.ratingCount = null;
    object.ratingSum = null;
    object.groupId = 13;
    object.user.password = passwordEncrypt;
    object.admissionDate = new Date();
    user = await User.create(object['user']);
    object.userId = user.id;
    usergroup = await UsersGroup.create(object);

    // Send email with token
    let transporter = nodeMailer.createTransport(emailConfig);
    // Email Structure
    let mailOptions = {
      from: 'no-replay@bisonreserve.com',
      to: object.user.email,
      subject: `[Bison] - ${i18n.__('auth.new-register.email-title')}`,
      html: `<br><b>${i18n.__('auth.new-register.message.1')}</b><br>
     ${object.user.email}<br><br><br>
    <b>${i18n.__('auth.new-register.message.2')}</b><br>
     ${password}<br>`
    };
    // If email has been sent notify user
    res = await transporter.sendMail(mailOptions);

    return { success: { id: usergroup.id }, code: 201 };
  } catch (e) {
    if (upload) {
      await deleteImageFromAWS(upload.key);
    }
    if (user) {
      user.destroy();
    }
    if (usergroup) {
      usergroup.destroy();
    }
    if (e.originalError && e.originalError.errno === 'ENOTFOUND') {
      return errorMessage(i18n.__('general.imageUpload'), 444);
    } else if (e.parent && e.parent.constraint === 'users_email_key') {
      return errorMessage(i18n.__('users.constrainst.uniqueEmail'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_group_id_fkey'
    ) {
      return errorMessage(i18n.__('users.fk.groupId'), 404);
    } else if (e.parent && e.parent.constraint === 'users_groups_gym_id_fkey') {
      return errorMessage(i18n.__('users.fk.gymId'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_user_id_fkey'
    ) {
      return errorMessage(i18n.__('users.fk.userId'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_group_id_gym_id_user_id_key'
    ) {
      return errorMessage(i18n.__('users.constrainst.uniqueGroupUserGym'), 404);
    } else {
      debug('Error:', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Updates user information
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function updateOneRoot(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let id = paramsValues[0];
    let object = paramsValues[1];
    let gymId = paramsValues[2];
    //object.gymId = gymId;
    //Check Schema
    delete usersGroupsSchema['required'];
    var res = shared.checkSchema(object, usersGroupsSchema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    delete usersSchema['required'];
    res = shared.checkSchema(object['user'], usersSchema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    if (object.user.birthday && new Date(object.user.birthday) > new Date()) {
      return errorMessage(i18n.__('users.incorrectBirthday'), 444);
    }

    // Gets current data
    res = await UsersGroup.findOne({
      where: { id, gymId, groupId: 13, isDelete: false, isActive: true },
      include: [{ association: 'user', where: { isDelete: false } }]
    });
    // User not found
    if (res === null) {
      return errorMessage(i18n.__('users.notFound'), 404);
    }
    // Cannot change user group
    if (object.groupId && object.groupId !== res.groupId) {
      return errorMessage(i18n.__('users.changeGroupId'), 404);
    }
    //Delete systems attributes
    [
      'isDelete',
      'createdAt',
      'updatedAt',
      'points',
      'rating',
      'ratingSum',
      'ratingCount',
      'admissionDate',
      'gymId'
    ].forEach(function(key) {
      delete object[key];
    });
    res = await res.update(object);
    //Delete systems attributes
    ['password', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object['user'][key];
    });
    //Update in DB
    await res.user.update(object['user']);
    return { success: {}, code: 200 };
  } catch (e) {
    if (e.originalError && e.originalError.errno === 'ENOTFOUND') {
      return errorMessage(i18n.__('general.imageUpload'), 444);
    } else if (e.parent && e.parent.constraint === 'users_email_key') {
      return errorMessage(i18n.__('users.constrainst.uniqueEmail'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_group_id_fkey'
    ) {
      return errorMessage(i18n.__('users.fk.groupId'), 404);
    } else if (e.parent && e.parent.constraint === 'users_groups_gym_id_fkey') {
      return errorMessage(i18n.__('users.fk.gymId'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_user_id_fkey'
    ) {
      return errorMessage(i18n.__('users.fk.userId'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'users_groups_group_id_gym_id_user_id_key'
    ) {
      return errorMessage(i18n.__('users.constrainst.uniqueGroupUserGym'), 404);
    } else {
      debug('Error:', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Deletes a user
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function deleteOneRoot(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let id = paramsValues[0];
    let gymId = paramsValues[1];
    // Query
    let res = await UsersGroup.findOne({ where: { id, gymId, groupId: 13 } });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('users.notFound'), 404);
    }
    // Delete == Update isDelete: true
    res = await res.update({ isDelete: true });
    return { success: {}, code: 200 };
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}
module.exports = {
  getAll,
  getById,
  createOne,
  updateOne,
  deleteOne,
  getAllCoaches,
  getAllClients,
  getAllCoachesByDiscipline,
  putAllCoachesByDiscipline,
  getAllRoot,
  getByIdRoot,
  createOneRoot,
  updateOneRoot,
  deleteOneRoot
};
