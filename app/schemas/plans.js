'use strict';

// Plan JSON Schema
const Plan = {
  $id: 'plans',
  type: 'object',
  required: ['gymId', 'currencyId', 'name', 'price', 'isActive'],
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
        currencyId: {
          type: 'integer'
        },
        name: {
          type: 'string',
          minLength: 0,
          maxLength: 50
        },
        description: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 250 },
            { type: 'null' }
          ]
        },
        serial: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 32 },
            { type: 'null' }
          ]
        },
        price: {
          type: 'string'
          //pattern: '^[0-9]{10}.?[0-9]{50}?$'
        },
        isActive: {
          type: 'boolean'
        }
      }
    }
  ]
};
module.exports = Plan;
