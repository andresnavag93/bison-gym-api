'use strict';

/**
 * @swagger
 * tags:
 *  - name: Disciplines (APP)
 *    description: Disciplines CRUD
 */

// Config
const { JWT_KEY_APP, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const userService = require('../../services/app/usersGroups');
const service = require('../../services/app/disciplines');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /app/disciplines:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [Disciplines (APP)]
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
 * /app/disciplines/:id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [Disciplines (APP)]
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
 * /app/disciplines/:id/coaches:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [Disciplines (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAllCoachesByDiscipline = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(
    req,
    res,
    userService,
    'getAllCoachesByDiscipline',
    [id]
  );
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.get('/', getAll);
  routes.get('/:id/', getById);
  routes.get('/:id/coaches', getAllCoachesByDiscipline);
} else {
  routes.get(
    '/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getAll
  );
  routes.get(
    '/:id/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getById
  );
  routes.get(
    '/:id/coaches',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getAllCoachesByDiscipline
  );
}

module.exports = routes;
