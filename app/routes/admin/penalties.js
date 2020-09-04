'use strict';

/**
 * @swagger
 * tags:
 *  - name: Penalties (ADMIN)
 *    description: Penalties CRUD
 */

// Config
const { JWT_KEY_ADMIN, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/admin/penalties');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /admin/penalties/users_groups/:user_group_id:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [Penalties (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAll = async (req, res) => {
  let userGroupId = parseInt(req.params['user_group_id']);
  const resp = await baseRoute(req, res, service, 'getAll', [userGroupId]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/penalties/:id/users_groups/:user_group_id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [Penalties (ADMIN)]
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
 * /admin/penalties/users_groups/:user_group_id:
 *  post:
 *    summary: Creates an object
 *    description: Creates an object with the provided body
 *    tags: [Penalties (ADMIN)]
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
  const resp = await baseRoute(req, res, service, 'createOne', [userGroupId]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/penalties/:id/users_groups/:user_group_id:
 *  delete:
 *    summary: Deletes an object
 *    description: Deletes the object that match the provided id
 *    tags: [Penalties (ADMIN)]
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
  let userGroupId = parseInt(req.params['user_group_id']);
  const resp = await baseRoute(req, res, service, 'deleteOne', [
    id,
    userGroupId
  ]);
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.get('/users_groups/:user_group_id', getAll);
  routes.get('/:id/users_groups/:user_group_id', getById);
  routes.post('/users_groups/:user_group_id', createOne);
  routes.delete('/:id/users_groups/:user_group_id', deleteOne);
} else {
  routes.get(
    '/users_groups/:user_group_id',
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
  routes.post(
    '/users_groups/:user_group_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    createOne
  );
  routes.delete(
    '/:id/users_groups/:user_group_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    deleteOne
  );
}

module.exports = routes;
