'use strict';

/**
 * @swagger
 * tags:
 *  - name: Classes (ADMIN)
 *    description: Classes CRUD
 */

// Config
const { JWT_KEY_ADMIN, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/admin/classes');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /admin/classes/range/:start_date/:end_date:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [Classes (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAll = async (req, res) => {
  let startDate = new Date(req.params['start_date']);
  let endDate = new Date(req.params['end_date']);
  const resp = await baseRoute(req, res, service, 'getAll', [
    startDate,
    endDate
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/classes/:id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [Classes (ADMIN)]
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
 * /admin/classes:
 *  post:
 *    summary: Creates an object
 *    description: Creates an object with the provided body
 *    tags: [Classes (ADMIN)]
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
 * /admin/classes/:id:
 *  put:
 *    summary: Updates an object
 *    description: Updates an object with the provided body
 *    tags: [Classes (ADMIN)]
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
 * /admin/classes/:id:
 *  delete:
 *    summary: Deletes an object
 *    description: Deletes the object that match the provided id
 *    tags: [Classes (ADMIN)]
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
  const resp = await baseRoute(req, res, service, 'deleteOne', [id]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/classes/disciplines/:id/range/:start_date/:end_date::
 *  get:
 *    summary: Gets all objects of one discipline
 *    description: Get all object registered in the database
 *    tags: [Classes (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAllClassesOfDiscipline = async (req, res) => {
  let id = parseInt(req.params['id']);
  let startDate = new Date(req.params['start_date']);
  let endDate = new Date(req.params['end_date']);
  const resp = await baseRoute(req, res, service, 'getAllClassesOfDiscipline', [
    id,
    startDate,
    endDate
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/classes/users_groups/:id/range/:start_date/:end_date:
 *  get:
 *    summary: Gets all objects reserves of one user
 *    description: Get all object registered in the database
 *    tags: [Classes (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAllUserReserves = async (req, res) => {
  let id = parseInt(req.params['id']);
  let startDate = new Date(req.params['start_date']);
  let endDate = new Date(req.params['end_date']);
  const resp = await baseRoute(req, res, service, 'getAllUserReserves', [
    id,
    startDate,
    endDate
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/classes/multiples:
 *  post:
 *    summary: Creates an object
 *    description: Creates an object with the provided body
 *    tags: [Classes (ADMIN)]
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
const createMultipleClasses = async (req, res) => {
  let object = req.body;
  const resp = await baseRoute(req, res, service, 'createMultipleClasses', [
    object
  ]);
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.get(
    '/disciplines/:id/range/:start_date/:end_date',
    getAllClassesOfDiscipline
  );
  routes.get('/range/:start_date/:end_date', getAll);
  routes.post('/multiples', createMultipleClasses);
  routes.get('/:id/', getById);
  routes.post('/', createOne);
  routes.put('/:id/', updateOne);
  routes.delete('/:id/', deleteOne);
  routes.get(
    '/users_groups/:id/reserves/range/:start_date/:end_date',
    getAllUserReserves
  );
} else {
  routes.get(
    '/disciplines/:id/range/:start_date/:end_date',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    getAllClassesOfDiscipline
  );
  routes.get(
    '/range/:start_date/:end_date',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    getAll
  );
  routes.post(
    '/multiples',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    createMultipleClasses
  );
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
  routes.delete(
    '/:id/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    deleteOne
  );
  routes.get(
    '/users_groups/:id/reserves/range/:start_date/:end_date',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    getAllUserReserves
  );
}
module.exports = routes;
