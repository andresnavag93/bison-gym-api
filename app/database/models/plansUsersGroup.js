'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlansUsersGroup = sequelize.define(
    'PlansUsersGroup',
    {
      userGroupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_group_id',
        references: {
          model: 'users_groups',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      planId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'plan_id',
        references: {
          model: 'plans',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      paymentId: {
        unique: true,
        field: 'payment_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'payments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cutDay: {
        field: 'cut_day',
        type: DataTypes.DATE
      },
      isDelete: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        field: 'is_delete'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {
      tableName: 'plans_users_groups'
    }
  );
  PlansUsersGroup.associate = function(models) {
    PlansUsersGroup.belongsTo(models.Plan, {
      as: 'plan',
      foreignKey: 'planId'
    });
    PlansUsersGroup.belongsTo(models.UsersGroup, {
      as: 'usersGroup',
      foreignKey: 'userGroupId'
    });
    PlansUsersGroup.belongsTo(models.Payment, {
      as: 'payment',
      foreignKey: 'paymentId'
    });
  };
  return PlansUsersGroup;
};
