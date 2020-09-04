/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('disciplines', [
      {
        gym_id: 1,
        serial: 'W1',
        name: 'TRX',
        description: 'Esta es la disciplina de TRX.',
        is_active: true,
        rating: 4,
        rating_count: 12,
        rating_sum: 48,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W2',
        name: 'Yoga',
        description: 'Esta es la disciplina de Yoga.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W3',
        name: 'Spinning',
        description: 'Esta es la disciplina de Spinning.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W4',
        name: 'Boxing',
        description: 'Esta es la disciplina de Boxing.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W5',
        name: 'Power Bike	',
        description: 'Esta es la disciplina de Power Bike.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W6',
        name: 'HiFit',
        description: 'Esta es la disciplina de HiFit.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W7',
        name: 'Che',
        description: 'Esta es la disciplina de Che.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W8',
        name: 'Training Bike',
        description: 'Esta es la disciplina de Training Bike.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W9',
        name: 'Fit Combat',
        description: 'Esta es la disciplina de Fit Combat.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W10',
        name: 'Funcionales',
        description: 'Esta es la disciplina de Funcionales.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W11',
        name: 'Baile',
        description: 'Esta es la disciplina de Baile.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W12',
        name: 'Fight Boxing',
        description: 'Esta es la disciplina de Fight Boxing.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W13',
        name: 'Estiramiento',
        description: 'Esta es la disciplina de Estiramiento.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W14',
        name: 'Zumba',
        description: 'Esta es la disciplina de Zumba.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        serial: 'W15',
        name: 'Pesas',
        description: 'Esta es la disciplina de Pesas.',
        is_active: true,
        rating: 5,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('disciplines', null, {});
  }
};
