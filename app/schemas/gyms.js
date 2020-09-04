'use strict';

// Gym  JSON Schema
const Gym = {
  $id: 'gyms',
  type: 'object',
  required: [
    'name',
    'email',
    'phone1',
    'latitude',
    'longitude',
    'reserveLimitNumber',
    'penaltyDays',
    'timezone',
    'minDaysReserve',
    'isActive'
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
          maxLength: 50
        },
        seasonStartDate: {
          anyOf: [{ type: 'string', format: 'date-time' }, { type: 'null' }]
        },
        seasonEndDate: {
          anyOf: [{ type: 'string', format: 'date-time' }, { type: 'null' }]
        },
        email: {
          type: 'string',
          format: 'email',
          minLength: 0,
          maxLength: 100
        },
        logo: {
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
        },
        goals: {
          anyOf: [{ type: 'string' }, { type: 'null' }]
        },
        phone1: {
          type: 'string',
          minLength: 0,
          maxLength: 20
        },
        phone2: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 20 },
            { type: 'null' }
          ]
        },
        latitude: {
          type: 'number'
        },
        longitude: {
          type: 'number'
        },
        thankDays: {
          anyOf: [{ type: 'integer' }, { type: 'null' }]
        },
        preThankDays: { type: 'integer' },
        rating: {
          anyOf: [{ type: 'number' }, { type: 'null' }]
        },
        reserveLimitNumber: {
          type: 'integer'
        },
        address: {
          anyOf: [
            { type: 'string', minLength: 0, maxLength: 250 },
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
        penaltyDays: {
          type: 'integer'
        },
        timezone: {
          type: 'string',
          minLength: 0,
          maxLength: 35
        },
        minDaysReserve: {
          type: 'integer'
        },
        isActive: {
          type: 'boolean'
        }
      }
    }
  ]
};

module.exports = Gym;
