'use strict';
module.exports = (sequelize, DataTypes) => {
  const Penalty = sequelize.define(
    'Penalty',
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
      startDate: {
        allowNull: false,
        field: 'start_date',
        type: DataTypes.DATE
      },
      endDate: {
        allowNull: false,
        field: 'end_date',
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
      tableName: 'penalties'
    }
  );
  Penalty.associate = function(models) {
    Penalty.belongsTo(models.UsersGroup, {
      as: 'usersGroup',
      foreignKey: 'userGroupId'
    });
  };
  return Penalty;
};
