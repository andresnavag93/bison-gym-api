'use strict';

// posts JSON Schema
const New = {
  $id: 'news',
  type: 'object',
  required: ['gymId', 'typeId', 'title', 'message'],
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
        gymId: {
          type: 'integer'
        },
        title: {
          type: 'string',
          minLength: 0,
          maxLength: 50
        },
        message: {
          type: 'string'
        }
      }
    }
  ]
};
module.exports = New;
