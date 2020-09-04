/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users_groups',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        group_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'attributes',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        gym_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'gyms',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        admission_date: {
          allowNull: false,
          type: Sequelize.DATE
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
        points: {
          type: Sequelize.INTEGER
        },
        is_active: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        gym_rating: {
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
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ['group_id', 'gym_id', 'user_id']
          }
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_groups');
  }
};
