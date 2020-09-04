/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'security_codes',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_group_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'users_groups',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        type_id: {
          allowNull: false,
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
        serial: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        is_used: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
            fields: ['user_group_id', 'serial']
          }
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('security_codes');
  }
};
