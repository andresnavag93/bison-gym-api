'use strict';

// User JSON Schema
const User = {
  $id: 'users',
  type: 'object',
  required: [
    'name',
    'lastname',
    'document',
    'email',
    'picture',
    'cellphone',
    'password',
    'password',
    'birthday',
    'anonymous'
  ],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string',
          minLength: 0,
          maxLength: 32
        },
        lastname: {
          type: 'string',
          minLength: 0,
          maxLength: 32
        },
        document: {
          type: 'string',
          minLength: 0,
          maxLength: 32
        },
        email: {
          type: 'string',
          format: 'email',
          minLength: 0,
          maxLength: 100
        },
        cellphone: {
          type: 'string',
          minLength: 0,
          maxLength: 20
        },
        password: {
          type: 'string',
          minLength: 0,
          maxLength: 100
        },
        birthday: {
          type: 'string',
          format: 'date-time'
        },
        anonymous: {
          type: 'boolean'
        },
        picture: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 100 },
            { type: 'null' }
          ]
        },
        address: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 250 },
            { type: 'null' }
          ]
        },
        customerId: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 50 },
            { type: 'null' }
          ]
        },
        twitter: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 35 },
            { type: 'null' }
          ]
        },
        instagram: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 35 },
            { type: 'null' }
          ]
        },
        facebook: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 100 },
            { type: 'null' }
          ]
        },
        linkedin: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 100 },
            { type: 'null' }
          ]
        },
        description: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 250 },
            { type: 'null' }
          ]
        }
      }
    }
  ]
};

module.exports = User;
