/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('disciplines_users_groups', [
      {
        user_group_id: 11,
        discipline_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 11,
        discipline_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 11,
        discipline_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 11,
        discipline_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 11,
        discipline_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 14,
        discipline_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 14,
        discipline_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 14,
        discipline_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 14,
        discipline_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 14,
        discipline_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 13,
        discipline_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 13,
        discipline_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 13,
        discipline_id: 13,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 13,
        discipline_id: 14,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 13,
        discipline_id: 15,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 13,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 14,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        discipline_id: 15,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('disciplines_plans', null, {});
  }
};
