'use strict';

// Media JSON Schema
const Media = {
  $id: 'medias',
  type: 'object',
  required: ['typeId', 'url'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        planId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        disciplineId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        gymId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        newId: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        typeId: {
          type: 'integer'
        },
        url: {
          type: 'string',
          minLength: 0,
          maxLength: 100
        }
      }
    }
  ]
};

module.exports = Media;
