/* eslint-disable no-unused-vars */
'use strict';

// Internationalization
const i18n = require('../../i18n/i18n');
// Console Debug Information
const debug = require('debug')('bison-backend:services:posts');
// Models
const { Post } = require('../../database/models');
// Generic Error Message
const { errorMessage } = require('../../utils/errorMessages');

/**
 * Gets last 10 posts registered
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
    let res = await Post.findAll({
      attributes: [
        'id',
        'title',
        'message',
        'typeId',
        'createdAt',
        'updatedAt'
      ],
      where: { isDelete: false, gymId },
      include: [
        {
          association: 'media',
          attributes: ['id', 'url', 'typeId']
        }
      ],
      order: [['updatedAt', 'DESC']],
      limit: 10
    });
    return res;
  } catch (e) {
    debug('Error: ', e);
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

/**
 * Finds a post by its id
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
    let res = await Post.findOne({
      attributes: [
        'id',
        'title',
        'message',
        'typeId',
        'createdAt',
        'updatedAt'
      ],
      where: { id, gymId, isDelete: false },
      include: [
        {
          association: 'media',
          attributes: ['id', 'url', 'typeId']
        }
      ]
    });

    // Attribute not found
    if (res === null) {
      return errorMessage(i18n.__('posts.notFound'), 404);
    }

    return res;
  } catch (e) {
    debug('Error: ', e);
    // Unexpected errors
    return errorMessage(i18n.__('general.unexpected'), 444);
  }
}

module.exports = {
  getById,
  getAll
};
