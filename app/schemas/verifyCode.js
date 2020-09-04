'use strict';

// verifyCode JSON Schema
const verifyCode = {
  $id: 'verifyCode',
  type: 'object',
  additionalProperties: true,
  properties: {
    serial: {
      type: 'integer'
    }
  }
};

module.exports = verifyCode;
