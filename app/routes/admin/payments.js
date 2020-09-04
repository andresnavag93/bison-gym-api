'use strict';

/**
 * @swagger
 * tags:
 *  - name: Payments (ADMIN)
 *    description: Payments CRUD
 */

// Config
const { JWT_KEY_ADMIN, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/admin/payments');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /admin/payments/users_groups/:user_group_id:
 *  get:
 *    summary: Gets all objects of one user
 *    description: Get all object registered in the database
 *    tags: [Payments (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAllUserGroup = async (req, res) => {
  let userGroupId = parseInt(req.params['user_group_id']);
  const resp = await baseRoute(req, res, service, 'getAllUserGroup', [
    userGroupId
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/payments/pending:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [Payments (ADMIN)]
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
 * /admin/payments/:id/users_groups/:user_group_id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [Payments (ADMIN)]
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
  let userGroupId = parseInt(req.params['user_group_id']);
  const resp = await baseRoute(req, res, service, 'getById', [id, userGroupId]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/payments/users_groups/:user_group_id:
 *  post:
 *    summary: Creates an object
 *    description: Creates an object with the provided body
 *    tags: [Payments (ADMIN)]
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
  let userGroupId = parseInt(req.params['user_group_id']);
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'createOne', [
    userGroupId,
    object
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/payments/:id/users_groups/:user_group_id:
 *  put:
 *    summary: Updates an object
 *    description: Updates an object with the provided body
 *    tags: [Payments (ADMIN)]
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
  let userGroupId = parseInt(req.params['user_group_id']);
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'updateOne', [
    id,
    userGroupId,
    object
  ]);
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.get('/users_groups/:user_group_id', getAllUserGroup);
  routes.get('/pending', getAll);
  routes.get('/:id/users_groups/:user_group_id', getById);
  routes.put('/:id/users_groups/:user_group_id', updateOne);
  routes.post('/users_groups/:user_group_id', createOne);
} else {
  routes.get(
    '/users_groups/:user_group_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    getAllUserGroup
  );
  routes.get(
    '/pending',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    getAll
  );
  routes.get(
    '/:id/users_groups/:user_group_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    getById
  );
  routes.put(
    '/:id/users_groups/:user_group_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    updateOne
  );
  routes.post(
    '/users_groups/:user_group_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    createOne
  );
}

module.exports = routes;