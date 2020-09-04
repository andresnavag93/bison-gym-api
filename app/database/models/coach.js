'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coach = sequelize.define(
    'Coach',
    {
      classId: {
        allowNull: false,
        field: 'class_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'classes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userGroupId: {
        allowNull: false,
        field: 'user_group_id',
        type: DataTypes.INTEGER,
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
      tableName: 'coaches',
      indexes: [{ unique: true, fields: ['userGroupId', 'classId'] }]
    }
  );
  Coach.associate = function(models) {
    Coach.belongsTo(models.Class, {
      as: 'class',
      foreignKey: 'classId'
    });
    Coach.belongsTo(models.UsersGroup, {
      as: 'usersGroup',
      foreignKey: 'userGroupId'
    });
  };
  return Coach;
};
