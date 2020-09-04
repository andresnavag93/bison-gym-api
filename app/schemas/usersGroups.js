'use strict';

// UserGroup JSON Schema
const UserGroup = {
  $id: 'usersgroups',
  type: 'object',
  required: ['userId', 'groupId', 'gymId', 'admissionDate', 'isActive'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        userId: {
          type: 'integer'
        },
        groupId: {
          type: 'integer'
        },
        gymId: {
          type: 'integer'
        },
        admissionDate: {
          type: 'string',
          format: 'date-time'
        },
        rating: {
          anyOf: [{ type: 'number' }, { type: 'null' }]
        },
        points: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        isActive: {
          type: 'boolean'
        }
      }
    }
  ]
};

module.exports = UserGroup;
