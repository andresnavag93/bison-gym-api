/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:users');
// Utils
const shared = require('../shared');
// Schema
const usersGroupsSchema = require('../../schemas/usersGroups');
const usersSchema = require('../../schemas/users');
// Models
const { UsersGroup, Media } = require('../../database/models');
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

/**
 * Finds a user by its id
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
      where: { id, gymId, isActive: true, isDelete: false },
      attributes: [
        'id',
        'points',
        'rating',
        'admissionDate',
        'groupId',
        'gymId'
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
          association: 'media',
          attributes: ['id', 'typeId', 'url']
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
 * @param {string} locale Language Configuration
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
        'admissionDate',
        'gymId',
        'groupId'
      ],
      where: { isDelete: false, gymId, groupId: 11, isActive: true },
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
 * Gets all coches by discipline registered
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllCoachesByDiscipline(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let disciplineId = paramsValues[0];

    let res = await UsersGroup.findAll({
      attributes: [
        'id',
        'points',
        'rating',
        'admissionDate',
        'gymId',
        'groupId'
      ],
      where: { isDelete: false, gymId, groupId: 11, isActive: true },
      include: [
        {
          association: 'disciplinesUsersGroup',
          attributes: [],
          where: { disciplineId, isDelete: false }
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
    // Check Schema
    delete usersGroupsSchema['required'];
    let res = shared.checkSchema(object, usersGroupsSchema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };
    delete usersSchema['required'];
    res = shared.checkSchema(object['user'], usersSchema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    // Gets current data
    res = await UsersGroup.findOne({
      attributes: ['id', 'groupId'],
      where: { id, gymId, isDelete: false },
      include: [
        { association: 'user', where: { isDelete: false } },
        { association: 'media' }
      ]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('users.notFound'), 404);
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
      key = null;
      if (res.media[0]) {
        key = extractKeyFromUrl(res.media[0].url, 'no-image-available.png');
      }
      //Check if exists new media
      delete object.media[0].url;
      if (object.media[0].base64) {
        uploadMedia = await uploadImageToAWS(object.media[0].base64, '/users');
        if (uploadMedia.Location) {
          object.media[0].url = uploadMedia.Location;
        }
        delete object.media[0].base64;
      }
      //Delete systems attributes
      ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
        delete object.media[0][key];
      });
    } else {
      delete object.media;
    }

    //Delete systems attributes
    [
      'document',
      'email',
      'password',
      'customerId',
      'description',
      'birthday',
      'isDelete',
      'createdAt',
      'updatedAt'
    ].forEach(function(key) {
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

module.exports = {
  getById,
  getAllCoaches,
  updateOne,
  getAllCoachesByDiscipline
};
