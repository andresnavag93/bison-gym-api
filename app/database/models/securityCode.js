'use strict';
module.exports = (sequelize, DataTypes) => {
  const SecurityCode = sequelize.define(
    'SecurityCode',
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
      typeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'type_id',
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'start_date'
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'end_date'
      },
      serial: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      isUsed: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        field: 'is_used'
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
      tableName: 'security_codes',
      indexes: [{ unique: true, fields: ['userGroupId', 'serial'] }]
    }
  );
  SecurityCode.associate = function(models) {
    SecurityCode.belongsTo(models.UsersGroup, {
      as: 'usersGroup',
      foreignKey: 'userGroupId'
    });
    SecurityCode.belongsTo(models.Attribute, {
      as: 'type',
      foreignKey: 'typeId'
    });
    // associations can be defined here
  };
  return SecurityCode;
};
