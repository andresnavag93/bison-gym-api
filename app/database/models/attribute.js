'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define(
    'Attribute',
    {
      attributeId: {
        type: DataTypes.INTEGER,
        field: 'attribute_id',
        references: {
          model: 'attributes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        validate: {
          max: 50
        }
      },
      value: {
        type: DataTypes.STRING(100)
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
      tableName: 'attributes'
    }
  );
  Attribute.associate = function(models) {
    Attribute.belongsTo(models.Attribute, {
      as: 'attribute',
      foreignKey: 'attributeId'
    });
    Attribute.hasMany(models.Attribute, {
      as: 'attributes',
      foreignKey: 'attributeId'
    });
    Attribute.hasMany(models.UsersGroup, {
      as: 'usersGroups',
      foreignKey: 'groupId'
    });
    Attribute.hasMany(models.SecurityCode, {
      as: 'securityCodes',
      foreignKey: 'typeId'
    });
    Attribute.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'typeId'
    });
    Attribute.hasMany(models.Bank, {
      as: 'banks',
      foreignKey: 'currencyId'
    });
    Attribute.hasMany(models.Plan, {
      as: 'plans',
      foreignKey: 'currencyId'
    });
    Attribute.hasMany(models.Media, {
      as: 'media',
      foreignKey: 'typeId'
    });
    Attribute.hasMany(models.Hour, {
      as: 'hours',
      foreignKey: 'dayId'
    });
    Attribute.hasMany(models.Class, {
      as: 'types',
      foreignKey: 'typeId'
    });
    Attribute.hasMany(models.Class, {
      as: 'classCurrencies',
      foreignKey: 'currencyId'
    });
    Attribute.hasMany(models.Payment, {
      as: 'status',
      foreignKey: 'statusId'
    });
    Attribute.hasMany(models.Payment, {
      as: 'paymentCurrencies',
      foreignKey: 'currencyId'
    });
    Attribute.hasMany(models.Plugin, {
      as: 'plugins',
      foreignKey: 'typeId'
    });
  };
  return Attribute;
};
