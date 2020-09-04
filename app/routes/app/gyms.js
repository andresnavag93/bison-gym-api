'use strict';

/**
 * @swagger
 * tags:
 *  - name: Gyms (APP)
 *    description: Gyms CRUD
 */

// Config
const { JWT_KEY_APP, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/app/gyms');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /app/gyms/:id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [Gyms (APP)]
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
  routes.get('/:id/', getById);
} else {
  routes.get(
    '/:id/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getById
  );
}

module.exports = routes;
