/* eslint-disable no-unused-vars */
'use strict';
// Better control of Date
const moment = require('moment-timezone');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('participants', [
      {
        class_id: 1,
        user_group_id: 2,
        is_waiting: false,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 2,
        user_group_id: 2,
        is_waiting: false,
        rating: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 3,
        user_group_id: 2,
        is_waiting: false,
        rating: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 4,
        user_group_id: 2,
        is_waiting: false,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 5,
        user_group_id: 2,
        is_waiting: false,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 6,
        user_group_id: 2,
        is_waiting: false,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        class_id: 7,
        user_group_id: 2,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 8,
        user_group_id: 2,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 9,
        user_group_id: 2,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 10,
        user_group_id: 2,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 11,
        user_group_id: 2,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 12,
        user_group_id: 2,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        class_id: 1,
        user_group_id: 6,
        is_waiting: false,
        rating: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 2,
        user_group_id: 6,
        is_waiting: false,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 3,
        user_group_id: 6,
        is_waiting: false,
        rating: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 4,
        user_group_id: 6,
        is_waiting: false,
        rating: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 5,
        user_group_id: 6,
        is_waiting: false,
        rating: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 6,
        user_group_id: 6,
        is_waiting: false,
        rating: 4,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        class_id: 7,
        user_group_id: 6,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 8,
        user_group_id: 6,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 9,
        user_group_id: 6,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 10,
        user_group_id: 6,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 11,
        user_group_id: 6,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_id: 12,
        user_group_id: 6,
        is_waiting: false,
        rating: null,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        class_id: 1,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },
      {
        class_id: 2,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },
      {
        class_id: 3,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },
      {
        class_id: 4,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },
      {
        class_id: 5,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },
      {
        class_id: 6,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },

      {
        class_id: 7,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },
      {
        class_id: 8,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },
      {
        class_id: 9,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },
      {
        class_id: 10,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },
      {
        class_id: 11,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },
      {
        class_id: 12,
        user_group_id: 7,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(1, 'hours')
          .format()
      },

      {
        class_id: 1,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      },
      {
        class_id: 2,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      },
      {
        class_id: 3,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      },
      {
        class_id: 4,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      },
      {
        class_id: 5,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      },
      {
        class_id: 6,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      },

      {
        class_id: 7,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      },
      {
        class_id: 8,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      },
      {
        class_id: 9,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      },
      {
        class_id: 10,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      },
      {
        class_id: 11,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      },
      {
        class_id: 12,
        user_group_id: 8,
        is_waiting: true,
        rating: null,
        created_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format(),
        updated_at: moment(new Date())
          .utc()
          .add(2, 'hours')
          .format()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('participants', null, {});
  }
};
