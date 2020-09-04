'use strict';

// Class JSON Schema
const Class = {
  $id: 'classes',
  type: 'object',
  required: ['disciplineId', 'startDate', 'endDate', 'isActive'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        disciplineId: {
          type: 'integer'
        },
        roomId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        typeId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        startDate: {
          type: 'string',
          format: 'date-time'
        },
        endDate: {
          type: 'string',
          format: 'date-time'
        },
        price: {
          anyOf: [{ type: 'string' }, { type: 'null' }]
        },
        capacity: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        rating: {
          anyOf: [{ type: 'number' }, { type: 'null' }]
        },
        isActive: {
          type: 'boolean'
        },
        points: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        currencyId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        }
      }
    }
  ]
};

module.exports = Class;
