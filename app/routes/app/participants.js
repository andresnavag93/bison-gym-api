'use strict';

/**
 * @swagger
 * tags:
 *  - name: Reserves (APP)
 *    description: Reserves CRUD
 */

// Config
const { JWT_KEY_APP, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/app/participants');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /app/participants/classes/:class_id/:
 *  get:
 *    summary: Gets participants of class
 *    description: Gets the object with the provided id
 *    tags: [Reserves (APP)]
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

/**
 * @swagger
 * /app/participants/classes/:class_id/:
 *  post:
 *    summary: Creates an object
 *    description: Creates an object with the provided body
 *    tags: [Reserves (APP)]
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
const postParticipant = async (req, res) => {
  let id = parseInt(req.params['id']);
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'postParticipant', [
    id,
    object
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /app/participants/classes/:class_id/:
 *  delete:
 *    summary: Deletes an object
 *    description: Deletes the object that match the provided id
 *    tags: [Reserves (APP)]
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
const deleteParticipant = async (req, res) => {
  let id = parseInt(req.params['id']);
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'deleteParticipant', [
    id,
    object
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /app/participants/classes/:class_id/rating:
 *  put:
 *    summary: Updates an object
 *    description: Updates an object with the provided body
 *    tags: [Reserves (APP)]
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
const putRateParticipantClass = async (req, res) => {
  let id = parseInt(req.params['id']);
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'putRateParticipantClass', [
    id,
    object
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /app/participants/gyms/rating:
 *  put:
 *    summary: Updates an object
 *    description: Updates an object with the provided body
 *    tags: [Reserves (APP)]
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
const putRateToGym = async (req, res) => {
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'putRateToGym', [object]);
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.get('/classes/:id/', getParticipantsById);
  routes.post('/classes/:id/', postParticipant);
  routes.delete('/classes/:id/', deleteParticipant);
  routes.put('/classes/:id/rating', putRateParticipantClass);
  routes.put('/gyms/rating', putRateToGym);
} else {
  routes.get(
    '/classes/:id/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getParticipantsById
  );
  routes.post(
    '/classes/:id/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10]]),
    postParticipant
  );
  routes.delete(
    '/classes/:id/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10]]),
    deleteParticipant
  );
  routes.put(
    '/classes/:id/rating',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10]]),
    putRateParticipantClass
  );
  routes.put(
    '/gyms/rating',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10]]),
    putRateToGym
  );
}

module.exports = routes;
