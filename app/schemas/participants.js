'use strict';

// Participant JSON Schema
const Participant = {
  $id: 'participants',
  type: 'object',
  required: ['classId', 'userGroupId'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        classId: {
          type: 'integer'
        },
        userGroupId: {
          type: 'integer'
        },
        couponId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        seat: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        rating: {
          anyOf: [{ type: 'number' }, { type: 'null' }]
        },
        points: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        isWaiting: {
          anyOf: [{ type: 'boolean' }, { type: 'null' }]
        },
        attended: {
          anyOf: [{ type: 'boolean' }, { type: 'null' }]
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  ]
};

module.exports = Participant;
