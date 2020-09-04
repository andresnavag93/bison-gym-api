/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:plans');
// Utils
const shared = require('../shared');
// Schema
const schema = require('../../schemas/plans');
const hourSchema = require('../../schemas/hours');
// Models
const {
  Discipline,
  DisciplinesPlan,
  Plan,
  Hour
} = require('../../database/models');
// AWS S3
const {
  uploadImageToAWS,
  deleteImageFromAWS,
  extractKeyFromUrl
} = require('../../utils/awsServices');
// Better control of Date
const moment = require('moment-timezone');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');
// Config
const { AWS } = require('../../config/config');

/**
 * Gets all plans registered
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
    let res = await Plan.findAll({
      where: { isDelete: false, gymId },
      attributes: ['id', 'name', 'serial', 'price', 'currencyId'],
      include: [
        {
          association: 'currency',
          attributes: ['id', 'name']
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
 * Finds a plan by its id
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
    let res = await Plan.findOne({
      attributes: {
        include: [],
        exclude: ['isDelete']
      },
      where: { id, gymId },
      include: [
        {
          association: 'hours',
          attributes: ['id', 'dayId', 'startHour', 'endHour']
        },
        {
          association: 'media',
          attributes: ['id', 'typeId', 'url']
        },
        {
          association: 'currency',
          attributes: ['id', 'name']
        }
      ]
    });
    // Attribute not found
    if (res === null) {
      return errorMessage(i18n.__('plans.notFound'), 404);
    }
    return res;
  } catch (e) {
    debug('Error: ', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Creates an plan
 * @param {*} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function createOne(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let object = paramsValues[0];
    let gymId = authHeader[1];
    var uploadMedia;

    //Check Schema
    object.gymId = gymId;
    schema['required'] = ['gymId', 'currencyId', 'name', 'price', 'isActive'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    //Check new media
    if (object.media && object.media.length > 0) {
      if (object.media[0].base64) {
        uploadMedia = await uploadImageToAWS(object.media[0].base64, '/plans');
        if (uploadMedia.Location) {
          object.media[0].url = uploadMedia.Location;
        }
        delete object.media[0].base64;
      } else {
        object.media[0].url = AWS.S3_URL + 'no-image-available.png';
      }
      // Deleting system attributes
      ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
        delete object.media[0][key];
      });
      object.media[0].typeId = 31;
    } else {
      object.media = [
        {
          typeId: 31,
          url: AWS.S3_URL + 'no-image-available.png'
        }
      ];
    }

    // Deleting system attributes
    ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });
    //Validates all hours dates
    let invalidHour, invalidFormat;
    if (object['hours'] && object['hours'].length > 0) {
      object['hours'].map(function(h) {
        ['id', 'isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
          delete h[key];
        });
        hourSchema['required'] = ['dayId', 'startHour', 'endHour'];
        res = shared.checkSchema(h, hourSchema);
        if (typeof res === 'object') {
          invalidFormat = true;
        } else {
          let startHour = moment(new Date(h.startHour)).utc();
          let endHour = moment(new Date(h.endHour)).utc();
          if (endHour <= startHour) {
            invalidHour = true;
          }
        }
      });
    }
    if (invalidFormat) {
      return errorMessage(i18n.__('plans.invalidHoursFormat'), 404);
    }
    if (invalidHour) {
      return errorMessage(i18n.__('plans.startDateGreater'), 404);
    }
    // Insert in DB
    res = await Plan.create(object, {
      include: [
        {
          association: 'hours'
        },
        {
          association: 'media'
        }
      ]
    });
    return { success: { id: res.id }, code: 201 };
  } catch (e) {
    if (uploadMedia) {
      await deleteImageFromAWS(uploadMedia.key);
    }
    if (e.originalError && e.originalError.errno === 'ENOTFOUND') {
      return errorMessage(i18n.__('general.imageUpload'), 444);
    } else if (e.parent && e.parent.constraint === 'plans_currency_id_fkey') {
      return errorMessage(i18n.__('plans.fk.currencyId'), 404);
    } else if (e.parent && e.parent.constraint === 'plans_gym_id_fkey') {
      return errorMessage(i18n.__('plans.fk.gymId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Updates plan information
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
    var uploadMedia;

    delete schema['required'];
    let res = shared.checkSchema(object, schema);
    if (typeof res === 'object') return { error: Object.values(res.error)[0] };

    // Gets current gym data
    res = await Plan.findOne({
      where: { id, gymId, isDelete: false },
      include: [
        {
          association: 'hours'
        },
        {
          association: 'media'
        }
      ]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('plans.notFound'), 404);
    }

    //Validates all hours dates
    let invalidHour, invalidFormat;
    let hours;
    if (object['hours'] && object['hours'].length > 0) {
      object['hours'].map(function(h) {
        hourSchema['required'] = ['dayId', 'startHour', 'endHour'];
        hours = shared.checkSchema(h, hourSchema);
        if (typeof hours === 'object') {
          invalidFormat = true;
        } else {
          let startHour = moment(new Date(h.startHour)).utc();
          let endHour = moment(new Date(h.endHour)).utc();
          if (endHour <= startHour) {
            invalidHour = true;
          }
        }
      });
    }
    if (invalidFormat) {
      return errorMessage(i18n.__('plans.invalidHoursFormat'), 404);
    }
    if (invalidHour) {
      return errorMessage(i18n.__('plans.startDateGreater'), 404);
    }

    object.gymId = gymId;
    // Deleting system attributes
    ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object[key];
    });

    //Checks new media
    let key;
    if (res.media[0]) {
      key = extractKeyFromUrl(res.media[0].url, 'no-image-available.png');
    }
    delete object.media[0].url;
    if (object.media[0].base64) {
      uploadMedia = await uploadImageToAWS(
        object.media[0].base64,
        '/plans',
        key
      );
      if (uploadMedia.Location) {
        object.media[0].url = uploadMedia.Location;
      }
      delete object.media[0].base64;
    }
    // Deleting system attributes
    ['isDelete', 'createdAt', 'updatedAt'].forEach(function(key) {
      delete object.media[0][key];
    });

    await res.update(object);
    await res.media[0].update(object['media'][0]);

    await Hour.destroy({ where: { planId: id } });
    object['hours'].map(async function(e) {
      await Hour.create({
        planId: id,
        dayId: e.dayId,
        startHour: e.startHour,
        endHour: e.endHour
      });
    });
    return {
      success: {},
      code: 200
    };
  } catch (e) {
    if (e.originalError && e.originalError.errno === 'ENOTFOUND') {
      return errorMessage(i18n.__('general.imageUpload'), 444);
    } else if (e.parent && e.parent.constraint === 'plans_currency_id_fkey') {
      return errorMessage(i18n.__('plans.fk.currencyId'), 404);
    } else if (e.parent && e.parent.constraint === 'plans_gym_id_fkey') {
      return errorMessage(i18n.__('plans.fk.gymId'), 404);
    } else {
      debug('Error: ', e);
      return errorMessage(i18n.__('general.unexpected'), 444);
    }
  }
}

/**
 * Finds all discipline plans by its id
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function getAllDisciplinesByPlan(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let planId = paramsValues[0];
    let gymId = authHeader[1];

    // Query
    let res = await Discipline.findAll({
      where: { isDelete: false },
      attributes: ['id', 'name', 'serial'],
      include: [
        {
          association: 'disciplinesPlans',
          attributes: [],
          where: { planId }
        }
      ]
    });
    // Not found
    if (res === null) {
      return errorMessage(i18n.__('plans.notFound'), 404);
    }

    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Update all discipline plans by its id
 * @param {string} locale Language Configuration
 * @param {*} authHeader Authorization Token, Gym id, User id
 * @param {*} paramsValues Params Values
 */
async function putAllDisciplineByPlan(locale, authHeader, paramsValues) {
  try {
    // Set user locale
    i18n.setLocale(locale);
    let gymId = authHeader[1];
    let object = paramsValues[1];
    let planId = paramsValues[0];

    await DisciplinesPlan.destroy({ where: { planId } });
    object.map(async function(e) {
      await DisciplinesPlan.create({ planId, disciplineId: e.id, tickets: 0 });
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
module.exports = {
  getAll,
  getById,
  createOne,
  updateOne,
  getAllDisciplinesByPlan,
  putAllDisciplineByPlan
};
