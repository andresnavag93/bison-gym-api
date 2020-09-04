'use strict';

// Hour JSON Schema
const Hour = {
  $id: 'hours',
  type: 'object',
  required: ['planId', 'dayId', 'startHour', 'endHour'],
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
        dayId: {
          type: 'integer'
        },
        startHour: {
          type: 'string',
          format: 'date-time'
        },
        endHour: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  ]
};

module.exports = Hour;
