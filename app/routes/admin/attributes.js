'use strict';

/**
 * @swagger
 * tags:
 *  - name: Attributes (ADMIN)
 *    description: Attributes CRUD
 */

// Config
const { JWT_KEY_ADMIN, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/admin/attributes');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /admin/attributes:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [Attributes (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAll = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAll', []);
  res.send(resp);
};

/**
 * @swagger
 * /admin/attributes/:id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [Attributes (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: One object
 *      404 (Not Found):
 *        description: There is no object with that id
 *      444 (No Response):
 *        description: Uncaught error
 */
const getById = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getById', [id]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/attributes:
 *  post:
 *    summary: Creates an object
 *    description: Creates an object with the provided body
 *    tags: [Attributes (ADMIN)]
 *    parameters:
 *    - name: Body
 *      in: body
 *      description: Object to be added
 *      required: true
 *    responses:
 *      201 (Created):
 *        description: Successfully added
 *      400 (Bad Request):
 *        description: Missing attributes
 *      422 (Unprocessable Entity):
 *        description: Body object error
 *      444 (No Response):
 *        description: Uncaught error
 */
const createOne = async (req, res) => {
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'createOne', [object]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/attributes/:id:
 *  put:
 *    summary: Updates an object
 *    description: Updates an object with the provided body
 *    tags: [Attributes (ADMIN)]
 *    parameters:
 *    - name: Body
 *      in: body
 *      description: Object to be updated
 *      required: true
 *    responses:
 *      200 (OK):
 *        description: Successfully updated
 *      401 (Unauthorized):
 *        description: Unauthorized
 *      404 (Not Found):
 *        description: There is no object with provided id
 *      422 (Unprocessable Entity):
 *        description: Body object error
 *      444 (No Response):
 *        description: Uncaught error
 */
const updateOne = async (req, res) => {
  let id = parseInt(req.params['id']);
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'updateOne', [id, object]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/attributes/:id:
 *  delete:
 *    summary: Deletes an object
 *    description: Deletes the object that match the provided id
 *    tags: [Attributes (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Successfully updated isDelete
 *      401 (Unauthorized):
 *        description: Unauthorized
 *      404 (Not Found):
 *        description: There is no object with provided id
 *      422 (Unprocessable Entity):
 *        description: Body object error
 *      444 (No Response):
 *        description: Uncaught error
 */
const deleteOne = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'deleteOne', [id]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/attributes/users_groups_roles:
 *  get:
 *    summary: Gets all user roles using in admin attributes
 *    description: Gets all user roles using in admin attributes
 *    tags: [Attributes (ADMIN)]
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
 * /admin/attributes/hours_days/:
 *  get:
 *    summary: Gets all schedule hours attributes
 *    description: Gets all schedule hours attributes
 *    tags: [Attributes (ADMIN)]
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
 * /admin/attributes/classes_types/:
 *  get:
 *    summary: Gets all classes types attributes
 *    description: Gets all classes types attributes
 *    tags: [Attributes (ADMIN)]
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
 * /admin/attributes/security_code_types/:
 *  get:
 *    summary: Gets all security types attributes
 *    description: Gets all security types attributes
 *    tags: [Attributes (ADMIN)]
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
 * /admin/attributes/payments_status/:
 *  get:
 *    summary: Gets all payments types attributes
 *    description: Gets all payments types attributes
 *    tags: [Attributes (ADMIN)]
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
 * /admin/attributes/currencies/:
 *  get:
 *    summary: Gets all currencies types attributes
 *    description: Gets all currencies types attributes
 *    tags: [Attributes (ADMIN)]
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
 * /admin/attributes/news_types/:
 *  get:
 *    summary: Gets all news types types attributes
 *    description: Gets all news types types attributes
 *    tags: [Attributes (ADMIN)]
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
 * /admin/attributes/medias_types/:
 *  get:
 *    summary: Gets all medias types types attributes
 *    description: Gets all medias types types attributes
 *    tags: [Attributes (ADMIN)]
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
 * /admin/attributes/addons_types/:
 *  get:
 *    summary: Gets all addons types types attributes
 *    description: Gets all addons types types attributes
 *    tags: [Attributes (ADMIN)]
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

//CRUD ATTRIBUTES
if (PERMISOLOGIES == 0) {
  //Custom Get Attributes
  routes.get('/currencies/', getCurrencies);
  routes.get('/users_groups_roles/', getUsersGroupRoles);
  routes.get('/hours_days/', getHoursDays);
  routes.get('/classes_types/', getClassesTypes);
  routes.get('/security_code_types/', getSecurityCodeTypes);
  routes.get('/payments_status/', getPaymentsStatus);
  routes.get('/news_types/', getNewsTypes);
  routes.get('/medias_types/', getMediasTypes);
  routes.get('/addons_types/', getAddonsTypes);

  //CRUD ATTRIBUTES
  routes.get('/', getAll);
  routes.get('/:id/', getById);
  routes.post('/', createOne);
  routes.put('/:id/', updateOne);
  routes.delete('/:id/', deleteOne);
} else {
  //Custom Get Attributes
  routes.get(
    '/currencies/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    getCurrencies
  );
  routes.get(
    '/users_groups_roles/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    getUsersGroupRoles
  );
  routes.get(
    '/hours_days/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    getHoursDays
  );
  routes.get(
    '/classes_types/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    getClassesTypes
  );
  routes.get(
    '/security_code_types/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    getSecurityCodeTypes
  );
  routes.get(
    '/payments_status/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    getPaymentsStatus
  );
  routes.get(
    '/news_types/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    getNewsTypes
  );
  routes.get(
    '/medias_types/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    getMediasTypes
  );
  routes.get(
    '/addons_types/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    getAddonsTypes
  );

  //CRUD ATTRIBUTES
  routes.get(
    '/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    getAll
  );
  routes.get(
    '/:id/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    getById
  );
  routes.post(
    '/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12]]),
    createOne
  );
  routes.put(
    '/:id/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12]]),
    updateOne
  );
  routes.delete(
    '/:id/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12]]),
    deleteOne
  );
}

module.exports = routes;
