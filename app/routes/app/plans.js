'use strict';

/**
 * @swagger
 * tags:
 *  - name: Plans (APP)
 *    description: Plans CRUD
 */

// Config
const { JWT_KEY_APP, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/app/plans');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /app/plans:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [Plans (APP)]
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
 * /app/plans/:id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [Plans (APP)]
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

if (PERMISOLOGIES == 0) {
  routes.get('/', getAll);
  routes.get('/:id', getById);
} else {
  routes.get(
    '/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getAll
  );
  routes.get(
    '/:id',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getById
  );
}

module.exports = routes;
