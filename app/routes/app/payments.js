'use strict';

/**
 * @swagger
 * tags:
 *  - name: Payments (APP)
 *    description: Payments CRUD
 */

// Config
const { JWT_KEY_APP, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/app/payments');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /app/payments:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [Payments (APP)]
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
 * /app/payments/:id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [Payments (APP)]
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
 * /app/payments:
 *  post:
 *    summary: Creates an object
 *    description: Creates an object with the provided body
 *    tags: [Payments (APP)]
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

if (PERMISOLOGIES == 0) {
  routes.get('/', getAll);
  routes.get('/:id/', getById);
  routes.post('/', createOne);
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
  routes.post(
    '/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10]]),
    createOne
  );
}

module.exports = routes;
