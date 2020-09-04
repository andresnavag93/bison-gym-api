/* eslint-disable no-unused-vars */
'use strict';

/** API Modules */
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

/** Logger */
const logger = require('morgan');
app.use(logger('dev'));

/** Intenationalization */
const i18n = require('./i18n/i18n');
app.use(i18n.init);
i18n.setLocale('es');

/** Configuration File */
const config = require('./config/config');

/** Colors to terminal */
const chalk = require('chalk');

/** Documentation */
const {
  swaggerUI,
  swaggerUIoptions,
  swaggerSpec
} = require('./config/swagger');
app.use(
  '/wayuinc/documentation/api/backend/bison/',
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUIoptions)
);

/** Middlewares */
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));
app.use(function(req, res, next) {
  // FIXME: Revisar como debe ir en caso de produccion
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, gym_id, user_group_id'
  );
  next();
});

/** Require routes */
const routes = require('./routes');
app.use('/', routes);

app.get('/', (req, res) => {
  res.send({ info: 'Node.js, Express, and Postgres API' });
});

/** Express error handler */
app.use((err, req, res, next) => {
  var lang = req.headers['accept-language'] || config.locale;

  i18n.setLocale(lang);
  console.log(err.message);

  if (
    err.message.match(/Permission denied/) ||
    err.message.match(/No authorization token was found/)
  ) {
    return res.status(401).send({
      error: { msg: i18n.__('users.token.unauthorized') }
    });
  }
  if (err.message.match(/jwt expired/)) {
    return res
      .status(401)
      .send({ error: { msg: i18n.__('users.token.expired'), code: 1 } });
  }
  if (err.status === 401) {
    return res.status(err.status).send({ error: err.message });
  }
  if (err.status === 403) {
    return res.status(err.status).send({ error: err.message });
  }
  if (err.status === 404) {
    return res.status(err.status).send({ error: err.message });
  }
  res.status(500).send({ error: err.message });
});

/** Express Initialization */
function initExpress() {
  console.log(`${chalk.green('[Bison Backend]:')} Initializing Express...`);
  server.listen(config.port, () => {
    console.log(
      `${chalk.green('[Bison Backend]:')} Running on port ${chalk.green(
        config.port
      )}!`
    );
  });
}

// Error management
function handleFatalError(err) {
  console.error(`${chalk.red('[Bison Backend]:')} fatal error: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}

/** Runs Bison API if file hasn't been required */
if (!module.parent) {
  initExpress();
  process.on('uncaughtException', handleFatalError);
  process.on('unhandledRejection', handleFatalError);
}

/** Exports Express server for tests */
module.exports = server;
