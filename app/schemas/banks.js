'use strict';

// Bank JSON Schema
const Bank = {
  $id: 'banks',
  type: 'object',
  required: ['gymId', 'currencyId', 'name', 'isActive'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        gymI: {
          type: 'integer'
        },
        currencyId: {
          type: 'integer'
        },
        accountName: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 50 },
            { type: 'null' }
          ]
        },
        name: {
          type: 'string',
          minLength: 0,
          maxLength: 50
        },
        document: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 20 },
            { type: 'null' }
          ]
        },
        accountNumber: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 32 },
            { type: 'null' }
          ]
        },
        isActive: {
          type: 'boolean'
        },
        zelle: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 100 },
            { type: 'null' }
          ]
        }
      }
    }
  ]
};

module.exports = Bank;
