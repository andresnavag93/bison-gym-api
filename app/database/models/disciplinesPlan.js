'use strict';
module.exports = (sequelize, DataTypes) => {
  const DisciplinesPlan = sequelize.define(
    'DisciplinesPlan',
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
      planId: {
        allowNull: false,
        field: 'plan_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'plans',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tickets: {
        type: DataTypes.INTEGER
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
      tableName: 'disciplines_plans',
      indexes: [{ unique: true, fields: ['disciplineId', 'planId'] }]
    }
  );
  DisciplinesPlan.associate = function(models) {
    DisciplinesPlan.belongsTo(models.Plan, {
      as: 'plan',
      foreignKey: 'planId'
    });
    DisciplinesPlan.belongsTo(models.Discipline, {
      as: 'discipline',
      foreignKey: 'disciplineId'
    });
  };
  return DisciplinesPlan;
};
