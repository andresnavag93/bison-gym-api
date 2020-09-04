'use strict';

/**
 * @swagger
 * tags:
 *  - name: Classes (APP)
 *    description: Classes CRUD
 */

// Config
const { JWT_KEY_APP, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/app/classes');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /app/classes/:id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [Classes (APP)]
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
 * /app/classes/disciplines/:id/range/:start_date/:end_date::
 *  get:
 *    summary: Gets all classes one discipline
 *    description: Get all object registered in the database
 *    tags: [Classes (APP)]
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
 * /app/classes/users_groups/:id/range/:start_date/:end_date:
 *  get:
 *    summary: Gets all reserves of one user
 *    description: Get all object registered in the database
 *    tags: [Classes (APP)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAllUserReserves = async (req, res) => {
  let startDate = new Date(req.params['start_date']);
  let endDate = new Date(req.params['end_date']);
  const resp = await baseRoute(req, res, service, 'getAllUserReserves', [
    startDate,
    endDate
  ]);
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.get('/reserves/range/:start_date/:end_date', getAllUserReserves);
  routes.get(
    '/disciplines/:id/range/:start_date/:end_date',
    getAllClassesOfDiscipline
  );
  routes.get('/:id/', getById);
} else {
  routes.get(
    '/:id/',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getById
  );
  routes.get(
    '/reserves/range/:start_date/:end_date',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getAllUserReserves
  );
  routes.get(
    '/disciplines/:id/range/:start_date/:end_date',
    auth({ secret: JWT_KEY_APP }),
    guard.check([[10], [11]]),
    getAllClassesOfDiscipline
  );
}

module.exports = routes;
