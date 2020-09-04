'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define(
    'Bank',
    {
      gymId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'gym_id',
        references: {
          model: 'gyms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      currencyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'currency_id',
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      accountName: {
        type: DataTypes.STRING(50),
        field: 'account_name'
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      document: {
        type: DataTypes.STRING(20)
      },
      accountNumber: {
        type: DataTypes.STRING(32),
        field: 'account_number'
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'is_active'
      },
      zelle: {
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
      tableName: 'banks'
    }
  );
  Bank.associate = function(models) {
    Bank.belongsTo(models.Attribute, {
      as: 'currency',
      foreignKey: 'currencyId'
    });
    Bank.belongsTo(models.Gym, {
      as: 'gym',
      foreignKey: 'gymId'
    });
    Bank.hasMany(models.Payment, {
      as: 'payments',
      foreignKey: 'bankId'
    });
  };
  return Bank;
};
