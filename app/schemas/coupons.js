'use strict';

//Coupon JSON Schema
const Coupon = {
  $id: 'coupons',
  type: 'object',
  required: ['serial', 'classId', 'isActive', 'discount'],
  anyOf: [
    {
      additionalProperties: true,
      properties: {
        id: {
          type: 'integer'
        },
        serial: {
          type: 'string',
          minLength: 0,
          maxLength: 50
        },
        classId: {
          type: 'integer'
        },
        isActive: {
          type: 'integer'
        },
        discount: {
          type: 'number'
        }
      }
    }
  ]
};

module.exports = Coupon;
