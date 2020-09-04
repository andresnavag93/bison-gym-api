'use strict';

// Login JSON Schema
const Login = {
  $id: 'login',
  type: 'object',
  additionalProperties: true,
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 0,
      maxLength: 100
    },
    password: {
      type: 'string',
      minLength: 0,
      maxLength: 20
    }
  }
};

module.exports = Login;
