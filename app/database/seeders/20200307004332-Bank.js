/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('banks', [
      {
        gym_id: 1,
        currency_id: 28,
        account_name: 'Wayuinc',
        name: 'Mercantil',
        document: 'J-12345678',
        account_number: '010533457584738',
        is_active: true,
        zelle: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        currency_id: 28,
        account_name: 'Wayuinc',
        name: 'Banesco',
        document: 'J-12345678',
        account_number: '013433457584738',
        is_active: true,
        zelle: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        gym_id: 1,
        currency_id: 27,
        account_name: 'Wayuinc',
        name: 'Wellsfargo',
        document: 'J-12345678',
        account_number: '013433457584738',
        is_active: true,
        zelle: 'zelle@wayuilllnc.com',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('banks', null, {});
  }
};
