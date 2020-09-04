'use strict';
module.exports = (sequelize, DataTypes) => {
  const DisciplinesUsersGroup = sequelize.define(
    'DisciplinesUsersGroup',
    {
      disciplineId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'discipline_id',
        references: {
          model: 'disciplines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
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
      tableName: 'disciplines_users_groups',
      indexes: [{ unique: true, fields: ['userGroupId', 'disciplineId'] }]
    }
  );
  DisciplinesUsersGroup.associate = function(models) {
    DisciplinesUsersGroup.belongsTo(models.Discipline, {
      as: 'discipline',
      foreignKey: 'disciplineId'
    });
    DisciplinesUsersGroup.belongsTo(models.UsersGroup, {
      as: 'usersGroup',
      foreignKey: 'userGroupId'
    });
  };
  return DisciplinesUsersGroup;
};
