'use strict';

// Payment JSON Schema
const Payment = {
  $id: 'payments',
  type: 'object',
  required: ['userGroupId', 'statusId', 'date', 'amount'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        bankId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        classId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        couponId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        userGroupId: {
          type: 'integer'
        },
        costumerId: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 50 },
            { type: 'null' }
          ]
        },
        statusId: {
          type: 'integer'
        },
        date: {
          type: 'string',
          format: 'date-time'
        },
        description: {
          anyOf: [{ type: 'string' }, { type: 'null' }]
        },
        amount: {
          type: 'string'
        },
        referenceNumber: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 30 },
            { type: 'null' }
          ]
        },
        currencyId: {
          type: 'integer'
        }
      }
    }
  ]
};

module.exports = Payment;
