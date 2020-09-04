/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'participants',
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
            model: 'classes',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
        coupon_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'coupons',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        seat: {
          type: Sequelize.INTEGER
        },
        rating: {
          type: Sequelize.REAL
        },
        points: {
          type: Sequelize.INTEGER
        },
        is_waiting: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        attended: {
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
            fields: ['class_id', 'user_group_id']
          }
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('participants');
  }
};
