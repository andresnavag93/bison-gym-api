/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users_groups',
      [
        {
          gym_id: null,
          group_id: 12,
          user_id: 1,
          admission_date: new Date(),
          rating: null,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 10,
          user_id: 2,
          admission_date: new Date(),
          rating: null,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 10,
          user_id: 3,
          admission_date: new Date(),
          rating: null,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 10,
          user_id: 4,
          admission_date: new Date(),
          rating: null,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 10,
          user_id: 5,
          admission_date: new Date(),
          rating: null,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 10,
          user_id: 6,
          admission_date: new Date(),
          rating: null,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 10,
          user_id: 7,
          admission_date: new Date(),
          rating: null,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 10,
          user_id: 8,
          admission_date: new Date(),
          rating: null,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 10,
          user_id: 9,
          admission_date: new Date(),
          rating: null,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 10,
          user_id: 10,
          admission_date: new Date(),
          rating: null,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },

        {
          gym_id: 1,
          group_id: 11,
          user_id: 11,
          admission_date: new Date(),
          rating_count: 4,
          rating_sum: 16,
          rating: 4,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 11,
          user_id: 12,
          admission_date: new Date(),
          rating_count: 4,
          rating_sum: 16,
          rating: 4,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 11,
          user_id: 13,
          admission_date: new Date(),
          rating_count: 2,
          rating_sum: 7,
          rating: 3.5,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          gym_id: 1,
          group_id: 11,
          user_id: 14,
          admission_date: new Date(),
          rating_count: 2,
          rating_sum: 9,
          rating: 4.5,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },

        {
          gym_id: 1,
          group_id: 13,
          user_id: 15,
          admission_date: new Date(),
          rating: null,
          points: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_groups', null, {});
  }
};
