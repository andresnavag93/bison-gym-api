/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gym_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'gyms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      currency_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      description: {
        type: Sequelize.TEXT
      },
      serial: {
        type: Sequelize.STRING(32)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      is_delete: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('plans');
  }
};
