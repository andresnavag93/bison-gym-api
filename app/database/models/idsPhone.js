'use strict';
module.exports = (sequelize, DataTypes) => {
  const IdsPhone = sequelize.define(
    'IdsPhone',
    {
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
      phoneId: {
        allowNull: false,
        field: 'phone_id',
        type: DataTypes.STRING(50)
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
      tableName: 'ids_phones',
      indexes: [{ unique: true, fields: ['userGroupId', 'phoneId'] }]
    }
  );
  IdsPhone.associate = function(models) {
    IdsPhone.belongsTo(models.UsersGroup, {
      as: 'usersGroup',
      foreignKey: 'userGroupId'
    });
  };
  return IdsPhone;
};
