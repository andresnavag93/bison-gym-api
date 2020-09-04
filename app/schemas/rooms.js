'use strict';

// Room JSON Schema
const Room = {
  $id: 'rooms',
  type: 'object',
  required: ['gymId', 'capacity'],
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
        name: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 50 },
            { type: 'null' }
          ]
        },
        capacity: {
          type: 'integer'
        }
      }
    }
  ]
};

module.exports = Room;
