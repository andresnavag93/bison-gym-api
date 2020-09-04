'use strict';

/**
 * @swagger
 * tags:
 *  - name: Statistics (ADMIN)
 *    description: Statistics CRUD
 */

// Config
const { JWT_KEY_ADMIN, PERMISOLOGIES } = require('../../config/config');
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/admin/statistics');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /admin/statistics/gyms/:id/top10/best/coaches/:
 *  get:
 *    summary: Get top 10 best coaches
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getTop10CoachBestRating = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getTop10CoachBestRating', [
    id
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/top10/worst/coaches/:
 *  get:
 *    summary: Get top 10 worst coaches
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getTop10CoachWorstRating = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getTop10CoachWorstRating', [
    id
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/more/used/plans/:
 *  get:
 *    summary: Get plan more used
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getPlanMoreUsed = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getPlanMoreUsed', [id]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/less/used/plans/:
 *  get:
 *    summary: Get plan less used
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getPlanLessUsed = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getPlanLessUsed', [id]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/more/used/banks/:
 *  get:
 *    summary: Get bank most used
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getBankMoreUsed = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getBankMoreUsed', [id]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/less/used/banks/:
 *  get:
 *    summary: Get bank less used
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getBankLessUsed = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getBankLessUsed', [id]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/more/reserved/disciplines/:
 *  get:
 *    summary: Gets disciplines more reserved
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getDisciplineMoreReserve = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getDisciplineMoreReserve', [
    id
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/less/reserved/disciplines/:
 *  get:
 *    summary: Gets disciplines less reserved
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getDisciplineLessReserve = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getDisciplineLessReserve', [
    id
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/top10/best/users/:
 *  get:
 *    summary: Gets top 10 users with most reserved
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getTop10UserWithMoreReserve = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(
    req,
    res,
    service,
    'getTop10UserWithMoreReserve',
    [id]
  );
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/top10/best/users/disciplines/:id:
 *  get:
 *    summary: Gets top 10 users with most reserved by discipline
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getTop10UserWithMoreReserveByDiscipline = async (req, res) => {
  let disciplineId = parseInt(req.params['discipline_id']);
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(
    req,
    res,
    service,
    'getTop10UserWithMoreReserveByDiscipline',
    [disciplineId, id]
  );
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/reserves/range/:start_date/:end_date:
 *  get:
 *    summary: Gets all reserves group by gym in Range Date
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getCountOneGymReserveByDateRange = async (req, res) => {
  let startDate = new Date(req.params['start_date']);
  let endDate = new Date(req.params['end_date']);
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(
    req,
    res,
    service,
    'getCountOneGymReserveByDateRange',
    [startDate, endDate, id]
  );
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/reserves/range/:start_date/:end_date:
 *  get:
 *    summary: Gets all reserves group by gym in Range Date
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getCountGymsReserveByDateRange = async (req, res) => {
  let startDate = new Date(req.params['start_date']);
  let endDate = new Date(req.params['end_date']);
  const resp = await baseRoute(
    req,
    res,
    service,
    'getCountGymsReserveByDateRange',
    [startDate, endDate]
  );
  res.send(resp);
};
/**
 * @swagger
 * /admin/statistics/gyms/:id/range/age/users/:
 *  get:
 *    summary: Count range of user's age
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getCountUsersByRangeAge = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getCountUsersByRangeAge', [
    id
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/count/used/currencies/:
 *  get:
 *    summary: Count total currency used group by currency
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getCountCurrencyUsed = async (req, res) => {
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getCountCurrencyUsed', [id]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/count/group/by/rating/disciplines/:id:
 *  get:
 *    summary: Gets all rating of one discipline group by rating
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getCountRatesByDiscipline = async (req, res) => {
  let disciplineId = parseInt(req.params['discipline_id']);
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(req, res, service, 'getCountRatesByDiscipline', [
    disciplineId,
    id
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/statistics/gyms/:id/disciplines/reserves/range/:start_date/:end_date:
 *  get:
 *    summary: Gets all reserves group by gym in Range Date
 *    description: Get all objects registered in the database
 *    tags: [Statistics (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getCountDiscipliensReserveByDateRange = async (req, res) => {
  let startDate = new Date(req.params['start_date']);
  let endDate = new Date(req.params['end_date']);
  let id = parseInt(req.params['id']);
  const resp = await baseRoute(
    req,
    res,
    service,
    'getCountDiscipliensReserveByDateRange',
    [startDate, endDate, id]
  );
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.get('/gyms/:id/top10/best/coaches/', getTop10CoachBestRating);
  routes.get('/gyms/:id/top10/worst/coaches/', getTop10CoachWorstRating);
  routes.get('/gyms/:id/more/used/plans/', getPlanMoreUsed);
  routes.get('/gyms/:id/less/used/plans/', getPlanLessUsed);
  routes.get('/gyms/:id/more/used/banks/', getBankMoreUsed);
  routes.get('/gyms/:id/less/used/banks/', getBankLessUsed);
  routes.get('/gyms/:id/more/reserved/disciplines/', getDisciplineMoreReserve);
  routes.get('/gyms/:id/less/reserved/disciplines/', getDisciplineLessReserve);
  routes.get('/gyms/:id/top10/best/users/', getTop10UserWithMoreReserve);
  routes.get(
    '/gyms/:id/top10/best/users/disciplines/:discipline_id',
    getTop10UserWithMoreReserveByDiscipline
  );
  routes.get(
    '/gyms/reserves/range/:start_date/:end_date',
    getCountGymsReserveByDateRange
  );
  routes.get(
    '/gyms/:id/reserves/range/:start_date/:end_date',
    getCountOneGymReserveByDateRange
  );
  routes.get('/gyms/:id/range/age/users/', getCountUsersByRangeAge);
  routes.get('/gyms/:id/count/used/currencies/', getCountCurrencyUsed);
  routes.get(
    '/gyms/:id/count/group/by/rating/disciplines/:discipline_id',
    getCountRatesByDiscipline
  );
  routes.get(
    '/gyms/:id/disciplines/reserves/range/:start_date/:end_date',
    getCountDiscipliensReserveByDateRange
  );
} else {
  routes.get(
    '/gyms/:id/top10/best/coaches/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getTop10CoachBestRating
  );
  routes.get(
    '/gyms/:id/top10/worst/coaches/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getTop10CoachWorstRating
  );
  routes.get(
    '/gyms/:id/more/used/plans/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getPlanMoreUsed
  );
  routes.get(
    '/gyms/:id/less/used/plans/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getPlanLessUsed
  );
  routes.get(
    '/gyms/:id/more/used/banks/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getBankMoreUsed
  );
  routes.get(
    '/gyms/:id/less/used/banks/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getBankLessUsed
  );
  routes.get(
    '/gyms/:id/more/reserved/disciplines/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getDisciplineMoreReserve
  );
  routes.get(
    '/gyms/:id/less/reserved/disciplines/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getDisciplineLessReserve
  );
  routes.get(
    '/gyms/:id/top10/best/users/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getTop10UserWithMoreReserve
  );
  routes.get(
    '/gyms/:id/top10/best/users/disciplines/:discipline_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getTop10UserWithMoreReserveByDiscipline
  );
  routes.get(
    '/gyms/reserves/range/:start_date/:end_date',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12]]),
    getCountGymsReserveByDateRange
  );
  routes.get(
    '/gyms/:id/reserves/range/:start_date/:end_date',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getCountOneGymReserveByDateRange
  );
  routes.get(
    '/gyms/:id/range/age/users/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getCountUsersByRangeAge
  );
  routes.get(
    '/gyms/:id/count/used/currencies/',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getCountCurrencyUsed
  );
  routes.get(
    '/gyms/:id/count/group/by/rating/disciplines/:discipline_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getCountRatesByDiscipline
  );
  routes.get(
    '/gyms/:id/disciplines/reserves/range/:start_date/:end_date',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13], [12]]),
    getCountDiscipliensReserveByDateRange
  );
}

module.exports = routes;
