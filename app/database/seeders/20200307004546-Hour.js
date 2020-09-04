/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'hours',
      [
        {
          plan_id: 1,
          day_id: 15,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 1,
          day_id: 16,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 1,
          day_id: 17,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 1,
          day_id: 18,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 1,
          day_id: 19,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 1,
          day_id: 20,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 2,
          day_id: 15,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 2,
          day_id: 16,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 2,
          day_id: 17,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 2,
          day_id: 18,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 2,
          day_id: 19,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 2,
          day_id: 20,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 3,
          day_id: 20,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 4,
          day_id: 15,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 4,
          day_id: 16,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 4,
          day_id: 17,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 4,
          day_id: 18,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 4,
          day_id: 19,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 4,
          day_id: 20,
          start_hour: '2020-04-10T8:00:00-04',
          end_hour: '2020-04-10T19:00:00-04',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('hours', null, {});
  }
};
