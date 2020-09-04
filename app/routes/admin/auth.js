'use strict';

/**
 * @swagger
 * tags:
 *  - name: Auth (ADMIN)
 *    description: Auth CRUD
 */

// Config
const { JWT_KEY_ADMIN, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/admin/auth');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /admin/auth/login:
 *  post:
 *    summary: User authenticacion
 *    description: User authenticacion registered in the database
 *    tags: [Auth (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const login = async (req, res) => {
  var login = req.body;
  const resp = await baseRoute(req, res, service, 'login', [login]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/auth/logout:
 *  delete:
 *    summary: User logout
 *    description: User logout with the provided id
 *    tags: [Auth (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: One object
 *      404 (Not Found):
 *        description: There is no object with that id
 *      444 (No Response):
 *        description: Uncaught error
 */
const logout = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'logout', []);
  res.send(resp);
};

/**
 * @swagger
 * /admin/auth/recovery/password/code/email/:
 *  get:
 *    summary: Get user security code for recovery password
 *    description: Get user security code for recovery password
 *    tags: [Auth (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: One object
 *      404 (Not Found):
 *        description: There is no object with that id
 *      444 (No Response):
 *        description: Uncaught error
 */
const sendCode = async (req, res) => {
  var email = req.body;
  const resp = await baseRoute(req, res, service, 'sendCode', [email]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/auth/recovery/password/code/email/verify:
 *  put:
 *    summary: Verify security code for recovery pasword
 *    description: Verify security code for recovery pasword
 *    tags: [Auth (ADMIN)]
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
const verifyCode = async (req, res) => {
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'verifyCode', [object]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/auth/users_groups/change/password/code:
 *  put:
 *    summary: Change user password by security code
 *    description: Change user password by security code
 *    tags: [Auth (ADMIN)]
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
const resetPassword = async (req, res) => {
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'resetPassword', [object]);
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.post('/login', login);
  routes.delete('/logout/', logout);
  routes.put('/recovery/password/code/email/', sendCode);
  routes.put('/recovery/password/code/email/verify', verifyCode);
  routes.put('/users_groups/change/password/code', resetPassword);
} else {
  routes.post('/login', login);
  routes.delete(
    '/logout/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12], [13]]),
    logout
  );
  routes.put('/recovery/password/code/email/', sendCode);
  routes.put('/recovery/password/code/email/verify', verifyCode);
  routes.put('/users_groups/change/password/code', resetPassword);
}

module.exports = routes;
