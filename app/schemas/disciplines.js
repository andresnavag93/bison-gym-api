'use strict';

// Discipline  JSON Schema
const Discipline = {
  $id: 'disciplines',
  type: 'object',
  required: ['gymId', 'name', 'description', 'isActive'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        gymId: {
          type: 'integer'
        },
        serial: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 32 },
            { type: 'null' }
          ]
        },
        name: {
          type: 'string',
          minLength: 0,
          maxLength: 50
        },
        description: {
          anyOf: [{ type: 'string' }, { type: 'null' }]
        },
        isActive: {
          type: 'boolean'
        },
        rating: {
          anyOf: [{ type: 'number' }, { type: 'null' }]
        }
      }
    }
  ]
};

module.exports = Discipline;
