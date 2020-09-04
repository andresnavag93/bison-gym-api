'use strict';

/** Documentation */
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Bison Backend API - Wayu Inc',
    version: '1.0.0',
    description: 'Reserve platform backend'
  },
  host: process.env.HEROKU_URL || 'localhost:3000',
  basePath: '/'
};

const options = {
  swaggerDefinition,
  /** Routes paths */
  apis: ['./app/routes/*/*.js', './app/routes/shared.js']
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUIoptions = {
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
    docExpansion: ['list']
  }
};

module.exports = {
  swaggerUI,
  swaggerUIoptions,
  swaggerSpec
};
