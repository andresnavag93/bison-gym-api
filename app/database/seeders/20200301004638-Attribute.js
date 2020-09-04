/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'attributes',
      [
        {
          attribute_id: null,
          name: 'USERS_GROUPS_ROLES',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: null,
          name: 'HOURS_DAYS',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: null,
          name: 'CLASSES_TYPE',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: null,
          name: 'SECURITY_CODES_TYPE',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: null,
          name: 'PAYMENT_STATUS',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: null,
          name: 'CURRENCY',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: null,
          name: 'NEWS_TYPE',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: null,
          name: 'MEDIAS_TYPE ',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: null,
          name: 'ADDONS_TYPE',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 1,
          name: 'CLIENT',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 1,
          name: 'COACH',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: null,
          name: 'ADMIN ROOT',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: null,
          name: 'ADMIN GYM',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 2,
          name: 'SUNDAY',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 2,
          name: 'MONDAY',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 2,
          name: 'TUESDAY',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 2,
          name: 'WEDNESDAY',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 2,
          name: 'THURSDAY',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 2,
          name: 'FRIDAY',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 2,
          name: 'SATURDAY',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 3,
          name: 'GROUPS',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 3,
          name: 'INDIVIDUAL',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 4,
          name: 'RECOVERY PASSWORD',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 5,
          name: 'PENDING',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 5,
          name: 'ACCEPTED',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 5,
          name: 'REJECTED',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 6,
          name: 'USD',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 6,
          name: 'BS',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 6,
          name: 'EU',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 7,
          name: 'NOTIFICATION',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 8,
          name: 'PICTURE',
          value: null,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('attributes', null, {});
  }
};
