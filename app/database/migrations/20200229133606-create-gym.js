/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gyms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      season_start_date: {
        type: Sequelize.DATE
      },
      season_end_date: {
        type: Sequelize.DATE
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      logo: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.TEXT
      },
      goals: {
        type: Sequelize.TEXT
      },
      phone_1: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      phone_2: {
        type: Sequelize.STRING(20)
      },
      latitude: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      longitude: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      thank_days: {
        type: Sequelize.INTEGER
      },
      pre_thank_days: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.REAL,
        defaultValue: 5
      },
      rating_count: {
        type: Sequelize.INTEGER
      },
      rating_sum: {
        type: Sequelize.INTEGER
      },
      reserve_limit_number: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING(250)
      },
      twitter: {
        type: Sequelize.STRING(35)
      },
      instagram: {
        type: Sequelize.STRING(35)
      },
      facebook: {
        type: Sequelize.STRING(100)
      },
      linkedin: {
        type: Sequelize.STRING(100)
      },
      penalty_days: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      timezone: {
        allowNull: false,
        defaultValue: 'America/Caracas',
        type: Sequelize.STRING(35)
      },
      min_days_reserve: {
        allowNull: false,
        defaultValue: 7,
        type: Sequelize.INTEGER
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      is_delete: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gyms');
  }
};
