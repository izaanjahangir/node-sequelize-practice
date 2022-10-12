"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("cuisines", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING(50),
          allowNull: false,
        },
        imagePath: {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cuisines");
  },
};
