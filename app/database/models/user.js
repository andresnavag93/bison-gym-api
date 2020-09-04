/* eslint-disable no-unused-vars */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(32)
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING(32)
      },
      document: {
        allowNull: false,
        type: DataTypes.STRING(32)
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(100),
        validate: { isEmail: true }
      },
      cellphone: {
        allowNull: false,
        type: DataTypes.STRING(20)
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(70)
      },
      birthday: {
        allowNull: false,
        type: DataTypes.DATE
      },
      anonymous: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      picture: {
        type: DataTypes.STRING(100)
      },
      address: {
        type: DataTypes.STRING(250)
      },
      customerId: {
        type: DataTypes.STRING(250),
        field: 'customer_id'
      },
      twitter: {
        type: DataTypes.STRING(35)
      },
      linkedin: {
        type: DataTypes.STRING(100)
      },
      facebook: {
        type: DataTypes.STRING(100)
      },
      instagram: {
        type: DataTypes.STRING(35)
      },
      description: {
        type: DataTypes.TEXT
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
      tableName: 'users'
    }
  );
  User.associate = function(models) {
    User.hasMany(models.UsersGroup, {
      as: 'usersGroups',
      foreignKey: 'userId'
    });
  };
  return User;
};
