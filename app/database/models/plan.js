'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define(
    'Plan',
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
      name: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      description: {
        type: DataTypes.TEXT
      },
      serial: {
        type: DataTypes.STRING(32)
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL
      },
      isActive: {
        allowNull: false,
        field: 'is_active',
        type: DataTypes.BOOLEAN
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
      tableName: 'plans'
    }
  );
  Plan.associate = function(models) {
    Plan.belongsTo(models.Gym, {
      as: 'gym',
      foreignKey: 'gymId'
    });
    Plan.belongsTo(models.Attribute, {
      as: 'currency',
      foreignKey: 'currencyId'
    });
    Plan.hasMany(models.Media, {
      as: 'media',
      foreignKey: 'planId'
    });
    Plan.hasMany(models.Hour, {
      as: 'hours',
      foreignKey: 'planId'
    });
    Plan.hasMany(models.DisciplinesPlan, {
      as: 'disciplinesPlans',
      foreignKey: 'planId'
    });
    Plan.hasMany(models.PlansUsersGroup, {
      as: 'plansUsersGroups',
      foreignKey: 'planId'
    });
  };
  return Plan;
};
