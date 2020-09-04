/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      discipline_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'disciplines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      room_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'rooms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.DECIMAL
      },
      capacity: {
        type: Sequelize.INTEGER
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
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      points: {
        type: Sequelize.INTEGER
      },
      currency_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    return queryInterface.dropTable('classes');
  }
};
