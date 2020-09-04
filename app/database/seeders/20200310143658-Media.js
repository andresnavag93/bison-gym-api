/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('media', [
      {
        gym_id: 1,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/gyms/gym_wayu_background.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 1,
        type_id: 31,
        url: 'https://s3.amazonaws.com/media.bison-reserve/plans/plan-full.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 2,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/plans/plan-gimnasio.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 3,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/plans/plan-sabatino.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        plan_id: 4,
        type_id: 31,
        url: 'https://s3.amazonaws.com/media.bison-reserve/plans/plan-yoga.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 1,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-1-trx.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 2,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-2-yoga.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 3,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-3-spinning.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 4,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-4-boxing.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 5,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-5-power-bike.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 6,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-6-hifit.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 7,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-7-che.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 8,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-8-training-bike.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 9,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-9-fit-combat.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 10,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-10-funcionales.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 11,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-11-baile.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 12,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-12-fight-boxing.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 13,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-13-estiramiento.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 14,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-14-zumba.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        discipline_id: 15,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/disciplines/sg-15-pesas.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 11,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/users/cam-speck-coach.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 12,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/users/michelle-lewin-coach.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 13,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/users/amanda-cerny-coach.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_group_id: 14,
        type_id: 31,
        url:
          'https://s3.amazonaws.com/media.bison-reserve/users/mike-ohearn-coach.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        post_id: 1,
        type_id: 31,
        url: 'https://s3.amazonaws.com/media.bison-reserve/plans/post-1.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        post_id: 3,
        type_id: 31,
        url: 'https://s3.amazonaws.com/media.bison-reserve/plans/post-3.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        post_id: 5,
        type_id: 31,
        url: 'https://s3.amazonaws.com/media.bison-reserve/plans/post-5.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        post_id: 7,
        type_id: 31,
        url: 'https://s3.amazonaws.com/media.bison-reserve/plans/post-7.jpg',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('media', null, {});
  }
};
