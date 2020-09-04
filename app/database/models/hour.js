'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hour = sequelize.define(
    'Hour',
    {
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
      dayId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'day_id',
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      startHour: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'start_hour'
      },
      endHour: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'end_hour'
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
      tableName: 'hours'
    }
  );
  Hour.associate = function(models) {
    Hour.belongsTo(models.Attribute, {
      as: 'day',
      foreignKey: 'dayId'
    });
    Hour.belongsTo(models.Plan, {
      as: 'plan',
      foreignKey: 'planId'
    });
  };
  return Hour;
};
