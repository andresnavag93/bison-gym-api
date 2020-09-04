'use strict';

// sendCode JSON Schema
const sendCode = {
  $id: 'sendCode',
  type: 'object',
  additionalProperties: true,
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 0,
      maxLength: 100
    }
  }
};

module.exports = sendCode;
