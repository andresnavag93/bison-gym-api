'use strict';

// Attribute JSON Schema
const Attribute = {
  $id: 'attributes',
  type: 'object',
  required: ['name'],
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
        value: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 100 },
            { type: 'null' }
          ]
        },
        attributeId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        }
      }
    }
  ]
};

module.exports = Attribute;
