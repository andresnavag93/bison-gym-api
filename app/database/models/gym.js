/* eslint-disable no-unused-vars */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define(
    'Gym',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      seasonStartDate: {
        type: DataTypes.DATE,
        field: 'season_start_date'
      },
      seasonEndDate: {
        type: DataTypes.DATE,
        field: 'season_end_date'
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(100),
        validate: { isEmail: true }
      },
      logo: {
        type: DataTypes.STRING(100)
      },
      description: {
        type: DataTypes.TEXT
      },
      goals: {
        type: DataTypes.TEXT
      },
      phone1: {
        allowNull: false,
        type: DataTypes.STRING(20),
        field: 'phone_1'
      },
      phone2: {
        type: DataTypes.STRING(20),
        field: 'phone_2'
      },
      latitude: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      longitude: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      thankDays: {
        type: DataTypes.INTEGER,
        field: 'thank_days'
      },
      preThankDays: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'pre_thank_days'
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
      reserveLimitNumber: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'reserve_limit_number'
      },
      address: {
        type: DataTypes.STRING(250)
      },
      twitter: {
        type: DataTypes.STRING(35)
      },
      instagram: {
        type: DataTypes.STRING(35)
      },
      facebook: {
        type: DataTypes.STRING(100)
      },
      linkedin: {
        type: DataTypes.STRING(100)
      },
      penaltyDays: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'penalty_days'
      },
      timezone: {
        allowNull: false,
        type: DataTypes.STRING(35)
      },
      minDaysReserve: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'min_days_reserve'
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'is_active'
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
      tableName: 'gyms'
    }
  );
  Gym.associate = function(models) {
    Gym.hasMany(models.UsersGroup, { as: 'usersGroups', foreignKey: 'gymId' });
    Gym.hasMany(models.Room, { as: 'rooms', foreignKey: 'gymId' });
    Gym.hasMany(models.Post, { as: 'posts', foreignKey: 'gymId' });
    Gym.hasMany(models.Bank, { as: 'banks', foreignKey: 'gymId' });
    Gym.hasMany(models.Discipline, { as: 'disciplines', foreignKey: 'gymId' });
    Gym.hasMany(models.Plan, { as: 'plans', foreignKey: 'gymId' });
    Gym.hasMany(models.Media, { as: 'media', foreignKey: 'gymId' });
    Gym.hasMany(models.GymsPlugin, { as: 'gymsPlugins', foreignKey: 'gymId' });
  };
  return Gym;
};
