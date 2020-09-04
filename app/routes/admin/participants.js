'use strict';

/**
 * @swagger
 * tags:
 *  - name: Reserves (ADMIN)
 *    description: Reserves CRUD
 */

// Config
const { JWT_KEY_ADMIN, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/admin/participants');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /admin/participants/classes/:id:
 *  get:
 *    summary: Gets All participants of one class
 *    description: Gets the objects with the provided id
 *    tags: [Reserves (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: One object
 *      404 (Not Found):
 *        description: There is no object with that id
 *      444 (No Response):
 *        description: Uncaught error
 */
const getParticipantsById = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getParticipantsById', [id]);
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.get('/classes/:id/', getParticipantsById);
} else {
  routes.get(
    '/classes/:id/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    getParticipantsById
  );
}

module.exports = routes;
