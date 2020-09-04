'use strict';

/**
 * @swagger
 * tags:
 *  - name: UsersGroups (ADMIN)
 *    description: UsersGroups CRUD
 */

// Config
const { JWT_KEY_ADMIN, PERMISOLOGIES } = require('../../config/config');
// Express.js router
// Express.js router
const routes = require('express').Router();
// Services
const service = require('../../services/admin/usersGroups');
// Base Routes
const { baseRoute } = require('./base');
// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

/**
 * @swagger
 * /admin/users_groups:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [UsersGroups (ADMIN)]
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
 * /admin/users_groups/:id:
 *  get:
 *    summary: Gets one object
 *    description: Gets the object with the provided id
 *    tags: [UsersGroups (ADMIN)]
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
 * /admin/users_groups:
 *  post:
 *    summary: Creates an object
 *    description: Creates an object with the provided body
 *    tags: [UsersGroups (ADMIN)]
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
 * /admin/users_groups/:id:
 *  put:
 *    summary: Updates an object
 *    description: Updates an object with the provided body
 *    tags: [UsersGroups (ADMIN)]
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
 * /admin/users_groups/:id:
 *  delete:
 *    summary: Deletes an object
 *    description: Deletes the object that match the provided id
 *    tags: [UsersGroups (ADMIN)]
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
 * /admin/users_groups/coaches:
 *  get:
 *    summary: Gets all coaches objects
 *    description: Get all coaches registered in the database
 *    tags: [UsersGroups (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAllCoaches = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllCoaches', []);
  res.send(resp);
};

/**
 * @swagger
 * /admin/users_groups/clients:
 *  get:
 *    summary: Gets all clients objects
 *    description: Get all coaches registered in the database
 *    tags: [UsersGroups (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAllClients = async (req, res) => {
  const resp = await baseRoute(req, res, service, 'getAllClients', []);
  res.send(resp);
};

/**
 * @swagger
 * /admin/users_groups/gyms/:gym_id:
 *  get:
 *    summary: Gets all objects
 *    description: Get all object registered in the database
 *    tags: [UsersGroups (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: Array of objects
 *      444 (No Response):
 *        description: Uncaught error
 */
const getAllRoot = async (req, res) => {
  let gymId = parseInt(req.params['gym_id']);
  const resp = await baseRoute(req, res, service, 'getAllRoot', [gymId]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/users_groups/:id/gyms/:gym_id:
 *  get:
 *    summary: Gets one object by Root
 *    description: Gets the object with the provided id
 *    tags: [UsersGroups (ADMIN)]
 *    responses:
 *      200 (OK):
 *        description: One object
 *      404 (Not Found):
 *        description: There is no object with that id
 *      444 (No Response):
 *        description: Uncaught error
 */
const getByIdRoot = async (req, res) => {
  let id = parseInt(req.params['id']);
  let gymId = parseInt(req.params['gym_id']);
  const resp = await baseRoute(req, res, service, 'getByIdRoot', [id, gymId]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/users_groups/gyms/:gym_id:
 *  post:
 *    summary: Creates an object by Root
 *    description: Creates an object with the provided body
 *    tags: [UsersGroups (ADMIN)]
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
const createOneRoot = async (req, res) => {
  let object = req.body;
  let gymId = parseInt(req.params['gym_id']);
  const resp = await baseRoute(req, res, service, 'createOneRoot', [
    object,
    gymId
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/users_groups/:id/gyms/:gym_id:
 *  put:
 *    summary: Updates an object by Root
 *    description: Updates an object with the provided body
 *    tags: [UsersGroups (ADMIN)]
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
const updateOneRoot = async (req, res) => {
  let id = parseInt(req.params['id']);
  let object = req.body;
  let gymId = parseInt(req.params['gym_id']);
  const resp = await baseRoute(req, res, service, 'updateOneRoot', [
    id,
    object,
    gymId
  ]);
  res.send(resp);
};

/**
 * @swagger
 * /admin/users_groups/:id/gyms/:gym_id:
 *  delete:
 *    summary: Deletes an object by Root
 *    description: Deletes the object that match the provided id
 *    tags: [UsersGroups (ADMIN)]
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
const deleteOneRoot = async (req, res) => {
  let id = parseInt(req.params['id']);
  let gymId = parseInt(req.params['gym_id']);
  const resp = await baseRoute(req, res, service, 'deleteOne', [id, gymId]);
  res.send(resp);
};

if (PERMISOLOGIES == 0) {
  routes.get('/', getAll);
  routes.get('/coaches', getAllCoaches);
  routes.get('/clients', getAllClients);
  routes.get('/:id/', getById);
  routes.post('/', createOne);
  routes.put('/:id/', updateOne);
  routes.delete('/:id/', deleteOne);

  routes.get('/gyms/:gym_id', getAllRoot);
  routes.get('/:id/gyms/:gym_id', getByIdRoot);
  routes.post('/gyms/:gym_id', createOneRoot);
  routes.put('/:id/gyms/:gym_id', updateOneRoot);
  routes.delete('/:id/gyms/:gym_id', deleteOneRoot);
} else {
  routes.get('/', auth({ secret: JWT_KEY_ADMIN }), guard.check([[13]]), getAll);
  routes.get(
    '/coaches',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    getAllCoaches
  );
  routes.get(
    '/clients',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[13]]),
    getAllClients
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
    '/gyms/:gym_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12]]),
    getAllRoot
  );
  routes.get(
    '/:id/gyms/:gym_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12]]),
    getByIdRoot
  );
  routes.post(
    '/gyms/:gym_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12]]),
    createOneRoot
  );
  routes.put(
    '/:id/gyms/:gym_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12]]),
    updateOneRoot
  );
  routes.delete(
    '/:id/gyms/:gym_id',
    auth({ secret: JWT_KEY_ADMIN }),
    guard.check([[12]]),
    deleteOneRoot
  );
}

module.exports = routes;
