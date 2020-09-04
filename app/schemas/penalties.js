'use strict';

// Penalty JSON Schema
const Penalty = {
  $id: 'penalties',
  type: 'object',
  required: ['userGroupId', 'startDate', 'endDate'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        userGroupId: {
          type: 'integer'
        },
        startDate: {
          type: 'string',
          format: 'date-time'
        },
        endDate: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  ]
};
module.exports = Penalty;
