/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'ids_phones',
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
        phone_id: {
          allowNull: false,
          type: Sequelize.STRING(50)
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
            fields: ['user_group_id', 'phone_id']
          }
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ids_phones');
  }
};
