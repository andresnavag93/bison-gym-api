'use strict';

/**
 * @swagger
 * tags:
 *  - name: Attributes (APP)
 *    description: Attributes CRUD
 */

// Config
const { JWT_KEY_APP, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/app/attributes');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /app/attributes/users_groups_roles:
 *  get:
 *    summary: Gets all user roles using in admin attributes
 *    description: Gets all user roles using in admin attributes
 *    tags: [Attributes (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of Attributes objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getUsersGroupRoles = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllCustom', ['1']);
  res.send(resp);
};

/**
 * @swagger
 * /app/attributes/hours_days/:
 *  get:
 *    summary: Gets all schedule hours attributes
 *    description: Gets all schedule hours attributes
 *    tags: [Attributes (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of Attributes objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getHoursDays = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllCustom', ['2']);
  res.send(resp);
};

/**
 * @swagger
 * /app/attributes/classes_types/:
 *  get:
 *    summary: Gets all classes types attributes
 *    description: Gets all classes types attributes
 *    tags: [Attributes (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of Attributes objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getClassesTypes = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllCustom', ['3']);
  res.send(resp);
};

/**
 * @swagger
 * /app/attributes/security_code_types/:
 *  get:
 *    summary: Gets all security types attributes
 *    description: Gets all security types attributes
 *    tags: [Attributes (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of Attributes objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getSecurityCodeTypes = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllCustom', ['4']);
  res.send(resp);
};

/**
 * @swagger
 * /app/attributes/payments_status/:
 *  get:
 *    summary: Gets all payments types attributes
 *    description: Gets all payments types attributes
 *    tags: [Attributes (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of Attributes objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getPaymentsStatus = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllCustom', ['5']);
  res.send(resp);
};

/**
 * @swagger
 * /app/attributes/currencies/:
 *  get:
 *    summary: Gets all currencies types attributes
 *    description: Gets all currencies types attributes
 *    tags: [Attributes (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of Attributes objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getCurrencies = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllCustom', ['6']);
  res.send(resp);
};

/**
 * @swagger
 * /app/attributes/news_types/:
 *  get:
 *    summary: Gets all news types types attributes
 *    description: Gets all news types types attributes
 *    tags: [Attributes (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of Attributes objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getNewsTypes = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllCustom', ['7']);
  res.send(resp);
};

/**
 * @swagger
 * /app/attributes/medias_types/:
 *  get:
 *    summary: Gets all medias types types attributes
 *    description: Gets all medias types types attributes
 *    tags: [Attributes (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of Attributes objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getMediasTypes = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllCustom', ['8']);
  res.send(resp);
};

/**
 * @swagger
 * /app/attributes/addons_types/:
 *  get:
 *    summary: Gets all addons types types attributes
 *    description: Gets all addons types types attributes
 *    tags: [Attributes (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of Attributes objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAddonsTypes = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllCustom', ['9']);
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.get('/currencies/', getCurrencies);
  routes.get('/attributes/', getUsersGroupRoles);
  routes.get('/hours_days', getHoursDays);
  routes.get('/classes_types/', getClassesTypes);
  routes.get('/security_code_types/', getSecurityCodeTypes);
  routes.get('/payments_status/', getPaymentsStatus);
  routes.get('/news_types/', getNewsTypes);
  routes.get('/medias_types/', getMediasTypes);
  routes.get('/addons_types/', getAddonsTypes);
} else {
  routes.get(
    '/currencies/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getCurrencies
  );
  routes.get(
    '/attributes/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getUsersGroupRoles
  );
  routes.get(
    '/hours_days',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getHoursDays
  );
  routes.get(
    '/classes_types/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getClassesTypes
  );
  routes.get(
    '/security_code_types/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getSecurityCodeTypes
  );
  routes.get(
    '/payments_status/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getPaymentsStatus
  );
  routes.get(
    '/news_types/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getNewsTypes
  );
  routes.get(
    '/medias_types/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getMediasTypes
  );
  routes.get(
    '/addons_types/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getAddonsTypes
  );
}

module.exports = routes;
