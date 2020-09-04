/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'gyms',
      [
        {
          name: 'Wayu Gym',
          season_start_date: null,
          season_end_date: null,
          email: 'admin@wayuinc.com',
          logo:
            'https://s3.amazonaws.com/media.bison-reserve/gyms/logo-wayu.png',
          description: 'Gimnasio Wayuinc',
          goals: null,
          phone_1: '+582129923331',
          phone_2: null,
          latitude: 38.8951,
          longitude: -77.0364,
          thank_days: 0,
          pre_thank_days: 2,
          rating: 5,
          reserve_limit_number: 1500,
          address: 'Las Mercedes',
          twitter: null,
          instagram: '@wayuinc',
          facebook: '@wayuinc',
          linkedin: 'Wayuinc',
          penalty_days: 3,
          is_active: true,
          timezone: 'America/Caracas',
          min_days_reserve: 7,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('gyms', null, {});
  }
};
