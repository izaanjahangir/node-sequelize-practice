"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("itemSpecifications", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
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
        value: {
          type: Sequelize.DataTypes.STRING(100),
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
    await queryInterface.dropTable("itemSpecifications");
  },
};
