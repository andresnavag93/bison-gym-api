'use strict';

/**
 * @swagger
 * tags:
 *  - name: UsersGroups (APP)
 *    description: UsersGroups CRUD
 */

// Config
const { JWT_KEY_APP, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/app/usersGroups');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /app/users_groups/:id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [UsersGroups (APP)]
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
 * /app/users_groups/coaches:
 *  get:
 *    summary: Gets all coache objects
 *    description: Get all coaches registered in the database
 *    tags: [UsersGroups (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAllCoaches = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllCoaches', []);
  res.send(resp);
};

/**
 * @swagger
 * /app/users_groups/:id:
 *  put:
 *    summary: Updates an object
 *    description: Updates an object with the provided body
 *    tags: [UsersGroups (APP)]
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

if (PERMISOLOGIES == 0) {
  routes.get('/coaches/', getAllCoaches);
  routes.get('/:id/', getById);
  routes.put('/:id/', updateOne);
} else {
  routes.get(
    '/coaches/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getAllCoaches
  );
  routes.get(
    '/:id/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getById
  );
  routes.put(
    '/:id/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    updateOne
  );
}

module.exports = routes;
