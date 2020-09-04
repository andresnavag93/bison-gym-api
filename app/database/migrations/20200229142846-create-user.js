/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      document: {
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100)
      },
      cellphone: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATE
      },
      anonymous: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      picture: {
        type: Sequelize.STRING(100)
      },
      address: {
        type: Sequelize.STRING(250)
      },
      customer_id: {
        type: Sequelize.STRING(250)
      },
      twitter: {
        type: Sequelize.STRING(35)
      },
      linkedin: {
        type: Sequelize.STRING(100)
      },
      facebook: {
        type: Sequelize.STRING(100)
      },
      instagram: {
        type: Sequelize.STRING(35)
      },
      description: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('users');
  }
};
