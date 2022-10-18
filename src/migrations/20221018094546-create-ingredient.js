"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("ingredients", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        itemId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "items",
            },
            key: "id",
          },
        },
        inventoryItemId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "inventoryitems",
            },
            key: "id",
          },
        },
        amount: {
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

      await queryInterface.addConstraint("ingredients", {
        type: "unique",
        fields: ["inventoryItemId", "itemId"],
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ingredients");
  },
};
