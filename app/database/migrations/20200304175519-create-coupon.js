/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'coupons',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        class_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'disciplines',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        serial: {
          allowNull: false,
          type: Sequelize.STRING(50)
        },
        discount: {
          allowNull: false,
          type: Sequelize.REAL
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
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ['class_id', 'serial']
          }
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('coupons');
  }
};
