'use strict';

// SecurityCode JSON Schema
const SecurityCode = {
  $id: 'security_codes',
  type: 'object',
  required: ['userGroupId', 'typeId', 'startDate', 'endDate', 'code'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        typeId: {
          type: 'integer'
        },
        userGroupId: {
          type: 'integer'
        },
        serial: {
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

module.exports = SecurityCode;
