'use strict';

// GymAddon  JSON Schema
const GymAddon = {
  $id: 'gyms_addons',
  type: 'object',
  required: ['gymId', 'addonId', 'isActive'],
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
        addonId: {
          type: 'integer'
        },
        isActive: {
          type: 'boolean'
        }
      }
    }
  ]
};

module.exports = GymAddon;
