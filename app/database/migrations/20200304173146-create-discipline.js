/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('disciplines', {
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
      serial: {
        type: Sequelize.STRING(32)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      description: {
        type: Sequelize.TEXT
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      rating: {
        type: Sequelize.REAL
      },
      rating_count: {
        type: Sequelize.INTEGER
      },
      rating_sum: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('disciplines');
  }
};
