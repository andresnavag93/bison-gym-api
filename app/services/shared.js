'use strict';

// Schema validator
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
// Intenationalization
const i18n = require('../i18n/i18n');

/**
 * Checks an object with a schema and if it doesn't passes the test generates error object
 * @param {*} object Object to check schema
 * @param {*} schema JSON Schema to be applied
 */
function checkSchema(object, schema) {
  ajv.removeSchema(schema.$id);
  let res = ajv.validate(schema, object);

  if (!res) {
    // Initializes error response
    res = { error: {} };

    // Iterates over error elements to get error messages
    ajv.errors.forEach(error => {
      if (error.keyword === 'oneOf' || error.keyword === 'anyOf') return;

      // Gets schema path to find errors in i18n
      var str = error.schemaPath;
      str = str.replace('#/', '');
      str = str.replace(/\//g, '.');

      // Necessary for required attributes
      var arr = str.split('.');
      var field = arr[arr.length - 1];

      // Object address
      var dataPath = error.dataPath.replace('.', '') || '';

      // Special treatment for required clauses
      if (field === 'required') {
        field = error.params.missingProperty;
        str += '.' + field;
        dataPath += '' + field;
      }

      // Creates error object
      res.error[dataPath] = {};
      var toEval = null;
      try {
        toEval = eval('object.' + dataPath); // eslint-disable-line no-eval
      } catch (e) {
        toEval = undefined;
      }

      // If no has initial value
      if (typeof toEval !== 'undefined') {
        res.error[dataPath]['value'] = toEval;
      }

      // Replace internal errors
      str = str.replace(/anyOf.\d./g, '');
      str = str.replace(/oneOf.\d./g, '');

      // Gets message with internationalization
      res.error[dataPath]['msg'] =
        dataPath + ' ' + i18n.__(schema.$id + '.schema.' + str);
      res.code = 422;
    });
  }

  return res;
}

module.exports = {
  checkSchema
};
