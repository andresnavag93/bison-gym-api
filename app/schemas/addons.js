'use strict';

// Addon JSON Schema
const Addon = {
  $id: 'addons',
  type: 'object',
  required: ['name', 'description', 'typeId'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string',
          minLength: 0,
          maxLength: 50
        },
        description: {
          type: 'string',
          minLength: 0,
          maxLength: 250
        },
        typeId: {
          type: 'integer'
        }
      }
    }
  ]
};

module.exports = Addon;
