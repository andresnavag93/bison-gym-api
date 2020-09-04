'use strict';
module.exports = (sequelize, DataTypes) => {
  const Discipline = sequelize.define(
    'Discipline',
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
      serial: {
        type: DataTypes.STRING(32)
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      description: {
        type: DataTypes.TEXT
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'is_active'
      },
      rating: {
        type: DataTypes.REAL,
        validate: { len: [1, 5] }
      },
      ratingCount: {
        type: DataTypes.INTEGER,
        field: 'rating_count'
      },
      ratingSum: {
        type: DataTypes.INTEGER,
        field: 'rating_sum'
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
      tableName: 'disciplines'
    }
  );
  Discipline.associate = function(models) {
    Discipline.belongsTo(models.Gym, {
      as: 'gym',
      foreignKey: 'gymId'
    });
    Discipline.hasMany(models.Media, {
      as: 'media',
      foreignKey: 'disciplineId'
    });
    Discipline.hasMany(models.DisciplinesUsersGroup, {
      as: 'disciplinesUsersGroup',
      foreignKey: 'disciplineId'
    });
    Discipline.hasMany(models.Class, {
      as: 'classes',
      foreignKey: 'disciplineId'
    });
    Discipline.hasMany(models.DisciplinesPlan, {
      as: 'disciplinesPlans',
      foreignKey: 'disciplineId'
    });
  };
  return Discipline;
};
