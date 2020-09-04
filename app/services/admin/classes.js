/* eslint-disable no-unused-vars */
'use strict';

// Configuration Files
const { emailConfig } = require('../../config/config');
// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:classes');
// Utils
const shared = require('../shared');
// Schema
const schema = require('../../schemas/classes');
// Models
const { Class, Coach, Participant } = require('../../database/models');
// Sequelize Operations
const { Op } = require('sequelize');
// Utils functions
const {
  customStructureStartDate,
  customStructureEndDate,
  validScheduleStructure
} = require('../../utils/customScheduleStructure');
// Better control of Date
const moment = require('moment-timezone');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');
// Emails
const nodeMailer = require('nodemailer');

/**
 * Gets all classes of discipline
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllClassesOfDiscipline(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    //let userGroupId = authHeader[2];
    let disciplineId = paramsValues[0];
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
        'capacity',
        'isActive',
        'roomId',
        'disciplineId'
      ],
      where: {
        isDelete: false,
        startDate: { [Op.gte]: startDate, [Op.lt]: endDate }
      },
      include: [
        {
          attributes: ['id', 'name'],
          association: 'discipline',
          where: { gymId, id: disciplineId, isDelete: false }
          // include: [
          //   {
          //     attributes: ['id', 'url', 'typeId'],
          //     association: 'media'
          //   }
          // ]
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
 * Gets all classes registered
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */

async function getAll(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let startDate = paramsValues[0];
    let endDate = paramsValues[1];
    // Query
    let res = await Class.findAll({
      attributes: [
        'id',
        'startDate',
        'endDate',
        'isActive',
        'roomId',
        'disciplineId'
      ],
      where: {
        isDelete: false,
        startDate: { [Op.gte]: startDate, [Op.lt]: endDate }
      },
      include: [
        {
          attributes: ['id', 'name'],
          association: 'discipline',
          where: { gymId, isDelete: false }
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

    // Query
    let res = await Class.findOne({
      attributes: [
        'id',
        'startDate',
        'endDate',
        'price',
        'rating',
        'currencyId',
        'capacity',
        'isActive',
        'roomId',
        'disciplineId'
      ],
      where: { isDelete: false, id },
      include: [
        {
          attributes: ['id', 'name'],
          association: 'discipline',
          where: { gymId, isDelete: false },
          include: [
            {
              attributes: ['id', 'url', 'typeId'],
              association: 'media'
            }
          ]
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
 * Creates an class
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let object = paramsValues[0];

    //Check Schema
    schema['required'] = ['disciplineId', 'startDate', 'endDate', 'isActive'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    let startDate = moment(object.startDate).utc();
    let endDate = moment(object.endDate).utc();
    if (endDate <= startDate) {
      return errorMessage(i18n.__('classes.startDateGreater'), 444);
    } else if (startDate < new Date()) {
      return errorMessage(i18n.__('classes.futureDate'), 444);
    }

    // Inserts Gym in DB
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });

    res = await Class.findAll({
      attributes: ['id'],
      where: {
        isDelete: false,
        roomId: object.roomId,
        disciplineId: object.disciplineId,
        [Op.or]: {
          startDate: { [Op.gte]: object.startDate, [Op.lt]: object.endDate },
          endDate: { [Op.gt]: object.startDate, [Op.lte]: object.endDate }
        }
      },
      order: [['startDate', 'ASC']]
    });

    if (res.length === 0) {
      // Verify if coach is set to the class
      if (object.coaches && object.coaches.length > 0) {
        object.rating = null;
        object.ratingCount = null;
        object.ratingSum = null;
        res = await Class.create(object, {
          include: [
            {
              association: 'coaches'
            }
          ]
        });
      } else {
        return errorMessage(i18n.__('classes.coachNotfound'), 444);
      }
      return { success: { id: res.id }, code: 201 };
    } else {
      return errorMessage(i18n.__('classes.existsHours'), 444);
    }
  } catch (e) {
    if (e.parent && e.parent.constraint === 'classes_currency_id_fkey') {
      return errorMessage(i18n.__('classes.fk.currencyId'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'classes_discipline_id_fkey'
    ) {
      return errorMessage(i18n.__('classes.fk.disciplineId'), 404);
    } else if (e.parent && e.parent.constraint === 'classes_room_id_fkey') {
      return errorMessage(i18n.__('classes.fk.roomId'), 404);
    } else if (e.parent && e.parent.constraint === 'classes_type_id_fkey') {
      return errorMessage(i18n.__('classes.fk.typeId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Updates class information
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
    // Check Schema
    delete schema['required'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    // Query
    res = await Class.findOne({
      attributes: ['id', 'isActive', 'isDelete', 'startDate'],
      where: { isDelete: false, id },
      include: [
        {
          attributes: ['id', 'name'],
          association: 'discipline',
          where: { gymId }
        },
        {
          association: 'coaches'
        },
        {
          association: 'participants',
          required: false,
          where: { isDelete: false },
          include: [
            { association: 'usersGroup', include: [{ association: 'user' }] }
          ]
        }
      ]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('classes.notFound'), 404);
    }

    let startDate = moment(res.startDate).utc();
    let dateNow = moment(new Date())
      .utc()
      .add(1, 'hours');
    if (startDate.diff(dateNow) < 0) {
      return errorMessage(i18n.__('classes.classFinished'), 444);
    } else {
      let startDate = moment(object.startDate).utc();
      let endDate = moment(object.endDate).utc();
      if (endDate <= startDate) {
        return errorMessage(i18n.__('classes.startDateGreater'), 444);
      } else if (startDate < new Date()) {
        return errorMessage(i18n.__('classes.futureDate'), 444);
      }

      if (res.participants[0]) {
        if (!object.isActive) {
          let emails = [];

          res.participants.map(async function(p) {
            emails.push(p.usersGroup.user.email);
            await Participant.update(
              { isDelete: true, isWaiting: false },
              { where: { id: p.id } }
            );
          });

          let transporter = nodeMailer.createTransport(emailConfig);
          // Email Structure
          let mailOptions = {
            from: 'no-replay@bisonreserve.com',
            to: emails,
            subject: `[Bison] - ${i18n.__(
              'classes.inactive-class.email-title'
            )}`,
            html: `<br><b>${i18n.__(
              'classes.inactive-class.message.1'
            )}</b><br><br>
          <b>${i18n.__('classes.inactive-class.message.2')}</b><br>
          ${res.discipline.name}<br><br><br>
          <b>${i18n.__('classes.inactive-class.message.3')}</b><br>
        ${res.startDate}<br>`
          };

          // If email has been sent notify user
          await transporter.sendMail(mailOptions);
        }
        res = await res.update({ isActive: object.isActive });
        return {
          success: {},
          code: 200
        };
      }

      let all = await Class.findAll({
        attributes: ['id'],
        where: {
          [Op.not]: { id: res.id },
          isDelete: false,
          roomId: object.roomId,
          disciplineId: object.disciplineId,
          [Op.or]: {
            startDate: { [Op.gte]: object.startDate, [Op.lt]: object.endDate },
            endDate: { [Op.gt]: object.startDate, [Op.lte]: object.endDate }
          }
        },
        order: [['startDate', 'ASC']]
      });
      if (all.length === 0) {
        // Check if a new coach or is the same
        let coach = res.coaches[0];
        if (coach === undefined) {
          await Coach.create({
            userGroupId: object.coaches[0].userGroupId,
            classId: id
          });
        } else {
          if (coach.userGroupId != object.coaches[0].userGroupId) {
            await Coach.destroy({ where: { id: coach.id } });
            await Coach.create({
              userGroupId: object.coaches[0].userGroupId,
              classId: id
            });
          }
        }
        // Deleting system attributes
        [
          'isDelete',
          'createdAt',
          'updatedAt',
          'rating',
          'ratingSum',
          'ratingCount'
        ].forEach(function(key) {
          delete object[key];
        });
        // Update in DB
        res = await res.update(object);

        return {
          success: {},
          code: 200
        };
      } else {
        return errorMessage(i18n.__('classes.existsHours'), 444);
      }
    }
  } catch (e) {
    if (e.parent && e.parent.constraint === 'classes_currency_id_fkey') {
      return errorMessage(i18n.__('classes.fk.currencyId'), 404);
    } else if (
      e.parent &&
      e.parent.constraint === 'classes_discipline_id_fkey'
    ) {
      return errorMessage(i18n.__('classes.fk.disciplineId'), 404);
    } else if (e.parent && e.parent.constraint === 'classes_room_id_fkey') {
      return errorMessage(i18n.__('classes.fk.roomId'), 404);
    } else if (e.parent && e.parent.constraint === 'classes_type_id_fkey') {
      return errorMessage(i18n.__('classes.fk.typeId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Deletes an class
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
    // Gets current gym data
    let res = await Class.findOne({
      attributes: ['id', 'isActive', 'isDelete'],
      where: { isDelete: false, id },
      include: [
        {
          attributes: ['id', 'name'],
          association: 'discipline',
          where: { gymId }
        }
      ]
    });
    //Not found
    if (res === null) {
      return errorMessage(i18n.__('classes.notFound'), 404);
    }
    res = await res.update({ isDelete: true });
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

/**
 * Get all users reserves
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllUserReserves(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let userGroupId = paramsValues[0];
    let startDate = paramsValues[1];
    let endDate = paramsValues[2];

    let res = await Class.findAll({
      attributes: [
        'id',
        'startDate',
        'endDate',
        'price',
        'currencyId',
        'isActive'
      ],
      where: {
        isDelete: false,
        startDate: { [Op.gte]: startDate, [Op.lt]: endDate }
      },
      include: [
        {
          attributes: ['id', 'name'],
          association: 'discipline',
          where: { gymId, isDelete: false }
          // include: [
          //   {
          //     attributes: ['id', 'url', 'typeId'],
          //     association: 'media'
          //   }
          // ]
        },
        {
          attributes: ['id', 'userGroupId', 'isDelete', 'isWaiting'],
          association: 'participants',
          required: true,
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
 * Creates multiple classes
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createMultipleClasses(locale, authHeader, paramsValues) {
  // Set user locale
  try {
    i18n.setLocale(locale);
    let object = paramsValues[0];
    //Check Schema

    schema['required'] = ['disciplineId', 'isActive'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    if (object.schedule) {
      if (
        object.schedule.length == 0 ||
        !validScheduleStructure(object.schedule)
      ) {
        return errorMessage(i18n.__('classes.scheduleError'), 444);
      }
    } else {
      return errorMessage(i18n.__('classes.scheduleNotFound'), 444);
    }

    res = await Class.findAll({
      attributes: ['id'],
      where: {
        isDelete: false,
        roomId: object.roomId,
        disciplineId: object.disciplineId,
        [Op.or]: {
          startDate: {
            [Op.or]: customStructureStartDate(object.schedule)
          },
          endDate: {
            [Op.or]: customStructureEndDate(object.schedule)
          }
        }
      },
      order: [['startDate', 'ASC']]
    });
    // Check if not exists classes in the specific hour
    if (res.length === 0) {
      //Create each new class
      object.schedule.map(async function(e) {
        object.startDate = e.startDate;
        object.endDate = e.endDate;
        res = await Class.create(object, {
          include: [
            {
              association: 'coaches'
            }
          ]
        });
      });
      return { success: true, code: 201 };
    } else {
      return errorMessage(i18n.__('classes.existsHours'), 444);
    }
  } catch (e) {
    debug('Error:', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}
module.exports = {
  getAll,
  getById,
  createOne,
  updateOne,
  deleteOne,
  getAllClassesOfDiscipline,
  getAllUserReserves,
  createMultipleClasses
};
