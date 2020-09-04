/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('disciplines_plans', [
      {
        plan_id: 1,
        discipline_id: 1,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 2,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 3,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 4,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 5,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 6,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 7,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 8,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 9,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 10,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 11,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 13,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 12,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 14,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        discipline_id: 15,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 4,
        discipline_id: 2,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      }, //Solo Yoga
      {
        plan_id: 3,
        discipline_id: 1,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 2,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 3,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 4,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 5,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 6,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 7,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 8,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 9,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 10,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 11,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 12,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 13,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 14,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        discipline_id: 15,
        tickets: 5,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('disciplines_plans', null, {});
  }
};
