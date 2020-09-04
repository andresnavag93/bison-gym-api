'use strict';

/**
 * @swagger
 * tags:
 *  - name: Plans (ADMIN)
 *    description: Plans CRUD
 */

// Config
const { JWT_KEY_ADMIN, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/admin/plans');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /admin/plans:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [Plans (ADMIN)]
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
 * /admin/plans/:id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [Plans (ADMIN)]
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
 * /admin/plans:
 *  post:
 *    summary: Creates an object
 *    description: Creates an object with the provided body
 *    tags: [Plans (ADMIN)]
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

/**
 * @swagger
 * /admin/plans/:id:
 *  put:
 *    summary: Updates an object
 *    description: Updates an object with the provided body
 *    tags: [Plans (ADMIN)]
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

/**
 * @swagger
 * /admin/plans/:id/disciplines:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [Banks (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAllDisciplinesByPlan = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getAllDisciplinesByPlan', [
    id
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/plans/:id/disciplines:
 *  put:
 *    summary: Updates an object
 *    description: Updates an object with the provided body
 *    tags: [Banks (ADMIN)]
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
const putAllDisciplineByPlan = async (req, res) => {
  let id = parseInt(req.params['id']);
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'putAllDisciplineByPlan', [
    id,
    object
  ]);
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.get('/:id/disciplines', getAllDisciplinesByPlan);
  routes.put('/:id/disciplines', putAllDisciplineByPlan);
  routes.get('/', getAll);
  routes.get('/:id/', getById);
  routes.post('/', createOne);
  routes.put('/:id/', updateOne);
} else {
  routes.get(
    '/:id/disciplines',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    getAllDisciplinesByPlan
  );
  routes.put(
    '/:id/disciplines',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    putAllDisciplineByPlan
  );
  routes.get('/', auth({ secret: JWT_KEY_ADMIN }), guard.check([[13]]), getAll);
  routes.get(
    '/:id/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    getById
  );
  routes.post(
    '/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    createOne
  );
  routes.put(
    '/:id/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    updateOne
  );
}

module.exports = routes;
