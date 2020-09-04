/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'plans',
      [
        {
          gym_id: 1,
          currency_id: 27,
          name: 'Plan Full',
          description:
            'Este es el plan Full. Contiene todas las clases y permiso para la sala de pesas todos los dias de la semana, en el horario completo.',
          serial: 'PF-1',
          price: 20,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          gym_id: 1,
          currency_id: 27,
          name: 'Plan Gimmnasio',
          description:
            'Este es el plan Gimmnasio. Contiene permiso solo para la sala de pesas todos los dias de la semana.',
          serial: 'PF-2',
          price: 10,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          gym_id: 1,
          currency_id: 27,
          name: 'Plan Sabatino',
          description:
            'Este es el plan Sabatino. Contiene permiso para la sala de pesas y clases los dias sabados.',
          serial: 'PF-3',
          price: 15,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          gym_id: 1,
          currency_id: 27,
          name: 'Plan Yoga',
          description:
            'Este es el plan Yoga. Contiene permiso para la sala de pesas todos los dias de la semana y clases de Yoga.',
          serial: 'PF-4',
          price: 10,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('plans', null, {});
  }
};
