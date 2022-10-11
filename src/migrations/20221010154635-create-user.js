"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      gender: {
        type: Sequelize.DataTypes.CHAR(1),
        allowNull: false,
      },
      roleId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.CHAR(60),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
