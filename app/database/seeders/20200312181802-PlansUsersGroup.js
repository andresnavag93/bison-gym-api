/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('plans_users_groups', [
      {
        plan_id: 1,
        user_group_id: 6,
        payment_id: 1,
        cut_day: '2020-04-16T00:00:00-04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 6,
        payment_id: 2,
        cut_day: new Date(),
        created_at: '2020-03-12T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 6,
        payment_id: 3,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 6,
        payment_id: 4,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 6,
        payment_id: 5,
        cut_day: new Date(),
        created_at: '2020-03-14T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 6,
        payment_id: 6,
        cut_day: new Date(),
        created_at: '2020-03-15T00:00:00-04',
        updated_at: new Date()
      },

      {
        plan_id: 1,
        user_group_id: 2,
        payment_id: 7,
        cut_day: '2020-04-10T00:00:00-04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 2,
        payment_id: 8,
        cut_day: new Date(),
        created_at: '2020-03-12T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 2,
        payment_id: 9,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 2,
        payment_id: 10,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 2,
        payment_id: 11,
        cut_day: new Date(),
        created_at: '2020-03-14T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 2,
        payment_id: 12,
        cut_day: new Date(),
        created_at: '2020-03-15T00:00:00-04',
        updated_at: new Date()
      },

      {
        plan_id: 3,
        user_group_id: 3,
        payment_id: 13,
        cut_day: '2020-04-10T00:00:00-04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        user_group_id: 3,
        payment_id: 14,
        cut_day: new Date(),
        created_at: '2020-03-12T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 3,
        user_group_id: 3,
        payment_id: 15,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 3,
        user_group_id: 3,
        payment_id: 16,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 3,
        user_group_id: 3,
        payment_id: 17,
        cut_day: new Date(),
        created_at: '2020-03-14T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 3,
        user_group_id: 3,
        payment_id: 18,
        cut_day: new Date(),
        created_at: '2020-03-15T00:00:00-04',
        updated_at: new Date()
      },

      {
        plan_id: 2,
        user_group_id: 4,
        payment_id: 19,
        cut_day: '2020-04-10T00:00:00-04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 2,
        user_group_id: 4,
        payment_id: 20,
        cut_day: new Date(),
        created_at: '2020-03-12T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 2,
        user_group_id: 4,
        payment_id: 21,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 2,
        user_group_id: 4,
        payment_id: 22,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 2,
        user_group_id: 4,
        payment_id: 23,
        cut_day: new Date(),
        created_at: '2020-03-14T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 2,
        user_group_id: 4,
        payment_id: 24,
        cut_day: new Date(),
        created_at: '2020-03-15T00:00:00-04',
        updated_at: new Date()
      },

      {
        plan_id: 4,
        user_group_id: 5,
        payment_id: 25,
        cut_day: '2020-04-10T00:00:00-04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 4,
        user_group_id: 5,
        payment_id: 26,
        cut_day: new Date(),
        created_at: '2020-03-12T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 4,
        user_group_id: 5,
        payment_id: 27,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 4,
        user_group_id: 5,
        payment_id: 28,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 4,
        user_group_id: 5,
        payment_id: 29,
        cut_day: new Date(),
        created_at: '2020-03-14T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 4,
        user_group_id: 5,
        payment_id: 30,
        cut_day: new Date(),
        created_at: '2020-03-15T00:00:00-04',
        updated_at: new Date()
      },

      {
        plan_id: 1,
        user_group_id: 7,
        payment_id: 31,
        cut_day: '2020-04-10T00:00:00-04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 7,
        payment_id: 32,
        cut_day: new Date(),
        created_at: '2020-03-12T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 7,
        payment_id: 33,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 7,
        payment_id: 34,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 7,
        payment_id: 35,
        cut_day: new Date(),
        created_at: '2020-03-14T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 7,
        payment_id: 36,
        cut_day: new Date(),
        created_at: '2020-03-15T00:00:00-04',
        updated_at: new Date()
      },

      {
        plan_id: 1,
        user_group_id: 8,
        payment_id: 37,
        cut_day: '2020-04-10T00:00:00-04',
        created_at: '2020-03-12T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 8,
        payment_id: 38,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 8,
        payment_id: 39,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 8,
        payment_id: 40,
        cut_day: new Date(),
        created_at: '2020-03-14T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 1,
        user_group_id: 8,
        payment_id: 41,
        cut_day: new Date(),
        created_at: '2020-03-15T00:00:00-04',
        updated_at: new Date()
      },

      {
        plan_id: 4,
        user_group_id: 9,
        payment_id: 42,
        cut_day: '2020-04-10T00:00:00-04',
        created_at: '2020-03-12T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 4,
        user_group_id: 9,
        payment_id: 43,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 4,
        user_group_id: 9,
        payment_id: 44,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 4,
        user_group_id: 9,
        payment_id: 45,
        cut_day: new Date(),
        created_at: '2020-03-14T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 4,
        user_group_id: 9,
        payment_id: 46,
        cut_day: new Date(),
        created_at: '2020-03-15T00:00:00-04',
        updated_at: new Date()
      },

      {
        plan_id: 2,
        user_group_id: 10,
        payment_id: 47,
        cut_day: '2020-04-10T00:00:00-04',
        created_at: '2020-03-12T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 2,
        user_group_id: 10,
        payment_id: 48,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 2,
        user_group_id: 10,
        payment_id: 49,
        cut_day: new Date(),
        created_at: '2020-03-13T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 2,
        user_group_id: 10,
        payment_id: 50,
        cut_day: new Date(),
        created_at: '2020-03-14T00:00:00-04',
        updated_at: new Date()
      },
      {
        plan_id: 2,
        user_group_id: 10,
        payment_id: 51,
        cut_day: new Date(),
        created_at: '2020-03-15T00:00:00-04',
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('plans_users_groups', null, {});
  }
};
