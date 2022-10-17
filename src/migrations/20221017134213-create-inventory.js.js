"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("inventories", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        inventoryItemId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "inventoryItems",
            },
            key: "id",
          },
        },
        amountAvailable: {
          type: Sequelize.DataTypes.FLOAT,
          allowNull: false,
        },

        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("inventories");
  },
};
