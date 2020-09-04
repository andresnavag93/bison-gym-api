'use strict';

// resetPassword JSON Schema
const resetPassword = {
  $id: 'resetPassword',
  type: 'object',
  additionalProperties: true,
  properties: {
    serial: {
      type: 'integer'
    },
    password: {
      type: 'string',
      minLength: 0,
      maxLength: 100
    },
    confirmPassword: {
      type: 'string',
      minLength: 0,
      maxLength: 100
    }
  }
};

module.exports = resetPassword;
