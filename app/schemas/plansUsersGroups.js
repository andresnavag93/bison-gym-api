'use strict';

// PlanUserGroup JSON Schema
const PlanUserGroup = {
  $id: 'plans_users_groups',
  type: 'object',
  required: ['planId', 'userGroupId', 'cutDay', 'paymentId'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        planId: {
          type: 'integer'
        },
        userGroupId: {
          type: 'integer'
        },
        paymentId: {
          type: 'integer'
        },
        cutDay: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  ]
};

module.exports = PlanUserGroup;
