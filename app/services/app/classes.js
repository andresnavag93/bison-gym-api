/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:classes');
// Models
const { Class } = require('../../database/models');
// Sequelize Operations
const { Op } = require('sequelize');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Gets all classes of dicipline registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllClassesOfDiscipline(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let disciplineId = paramsValues[0];
    let userGroupId = authHeader[2];
    let startDate = paramsValues[1];
    let endDate = paramsValues[2];

    let res = await Class.findAll({
      attributes: [
        'id',
        'startDate',
        'endDate',
        'rating',
        'price',
        'currencyId',
        'capacity'
      ],
      where: {
        isDelete: false,
        isActive: true,
        startDate: { [Op.gte]: startDate, [Op.lt]: endDate }
      },
      include: [
        {
          attributes: ['id', 'name'],
          association: 'discipline',
          where: { gymId, id: disciplineId, isActive: true, isDelete: false }
          // include: [
          //   {
          //     attributes: ['id', 'url', 'typeId'],
          //     association: 'media'
          //   }
          // ]
        },
        {
          attributes: ['id', 'userGroupId', 'isDelete', 'isWaiting', 'rating'],
          association: 'participants',
          required: false,
          where: {
            isDelete: false,
            userGroupId
          }
        }
      ],
      order: [['startDate', 'ASC']]
    });

    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Finds a class by its id
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
    let userGroupId = authHeader[2];

    // Query
    let res = await Class.findOne({
      attributes: [
        'id',
        'startDate',
        'endDate',
        'price',
        'rating',
        'currencyId',
        'capacity'
      ],
      where: { isDelete: false, id, isActive: true },
      include: [
        {
          attributes: ['id', 'name'],
          association: 'discipline',
          where: { gymId, isActive: true, isDelete: false },
          include: [
            {
              attributes: ['id', 'url', 'typeId'],
              association: 'media'
            }
          ]
        },
        {
          attributes: ['id', 'userGroupId', 'isDelete', 'isWaiting', 'rating'],
          association: 'participants',
          required: false,
          where: {
            isDelete: false,
            userGroupId
          }
        },
        {
          attributes: ['id', 'userGroupId'],
          association: 'coaches',
          include: [
            {
              association: 'usersGroup',
              attributes: [
                'id',
                'points',
                'rating',
                'admission_date',
                'groupId'
              ],
              include: [
                {
                  association: 'user',
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
                    'birthday'
                  ]
                },
                {
                  association: 'media',
                  attributes: ['id', 'url', 'typeId']
                }
              ]
            }
          ]
        },
        {
          attributes: ['id', 'name', 'capacity'],
          required: false,
          association: 'room'
        }
      ]
    });

    // Not found
    if (res === null) {
      return errorMessage(i18n.__('classes.notFound'), 404);
    }

    return res;
  } catch (e) {
    debug('Error: ', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Gets all users classes reserved registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllUserReserves(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let userGroupId = authHeader[2];
    let startDate = paramsValues[0];
    let endDate = paramsValues[1];
    //let disciplineId = paramsValues[0];

    let res = await Class.findAll({
      attributes: [
        'id',
        'startDate',
        'endDate',
        'price',
        'currencyId',
        'rating'
      ],
      where: {
        isDelete: false,
        isActive: true,
        startDate: { [Op.gte]: startDate, [Op.lt]: endDate }
      },
      include: [
        {
          attributes: ['id', 'userGroupId', 'isDelete', 'isWaiting', 'rating'],
          association: 'participants',
          // required: true,
          where: {
            isDelete: false,
            userGroupId
          }
        },
        {
          attributes: ['id', 'name'],
          association: 'discipline',
          where: { gymId, isActive: true, isDelete: false },
          required: true
          // include: [
          //   {
          //     attributes: ['id', 'url', 'typeId'],
          //     association: 'media',
          //     required: false,
          //     where: { isDelete: false }
          //   }
          // ]
        }
      ],
      order: [['startDate', 'ASC']]
    });

    res.map(function(e) {
      e.participants.map(function(f) {
        if (f.isDelete) {
          e.participants.splice(e.participants.indexOf(f), 1);
          return;
        }
      });
    });

    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

module.exports = {
  getById,
  getAllClassesOfDiscipline,
  getAllUserReserves
};
