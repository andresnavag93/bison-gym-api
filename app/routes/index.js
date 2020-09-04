'use strict';

// Express.js Router
const routes = require('express').Router();

// Admin Modules
const attributesAdmin = require('./admin/attributes');
const gymsAdmin = require('./admin/gyms');
const roomsAdmin = require('./admin/rooms');
const usersGroupsAdmin = require('./admin/usersGroups');
const banksAdmin = require('./admin/banks');
const plansAdmin = require('./admin/plans');
const postsAdmin = require('./admin/posts');
const disciplinesAdmin = require('./admin/disciplines');
const classesAdmin = require('./admin/classes');
const participantsAdmin = require('./admin/participants');
const paymentsAdmin = require('./admin/payments');
const penaltiesAdmin = require('./admin/penalties');
const statisticsAdmin = require('./admin/statistics');
const authAdmin = require('./admin/auth');

// App Modules
const attributesApp = require('./app/attributes');
const gymsApp = require('./app/gyms');
const roomsApp = require('./app/rooms');
const usersGroupsApp = require('./app/usersGroups');
const banksGroupsApp = require('./app/banks');
const plansApp = require('./app/plans');
const postsApp = require('./app/posts');
const disciplinesApp = require('./app/disciplines');
const classesApp = require('./app/classes');
const participantsApp = require('./app/participants');
const paymentsApp = require('./app/payments');
const authApp = require('./app/auth');

// Admin Use Routes
routes.use('/admin/attributes', attributesAdmin);
routes.use('/admin/gyms', gymsAdmin);
routes.use('/admin/rooms', roomsAdmin);
routes.use('/admin/users_groups/', usersGroupsAdmin);
routes.use('/admin/banks/', banksAdmin);
routes.use('/admin/plans/', plansAdmin);
routes.use('/admin/posts/', postsAdmin);
routes.use('/admin/disciplines/', disciplinesAdmin);
routes.use('/admin/classes/', classesAdmin);
routes.use('/admin/participants/', participantsAdmin);
routes.use('/admin/payments/', paymentsAdmin);
routes.use('/admin/penalties/', penaltiesAdmin);
routes.use('/admin/statistics/', statisticsAdmin);
routes.use('/admin/auth/', authAdmin);

// App use routes
routes.use('/app/attributes', attributesApp);
routes.use('/app/gyms', gymsApp);
routes.use('/app/rooms', roomsApp);
routes.use('/app/users_groups/', usersGroupsApp);
routes.use('/app/banks/', banksGroupsApp);
routes.use('/app/plans/', plansApp);
routes.use('/app/posts/', postsApp);
routes.use('/app/disciplines/', disciplinesApp);
routes.use('/app/classes/', classesApp);
routes.use('/app/participants/', participantsApp);
routes.use('/app/payments/', paymentsApp);
routes.use('/app/auth/', authApp);

module.exports = routes;
