"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("items", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING(200),
          allowNull: false,
        },
        price: {
          type: Sequelize.DataTypes.DECIMAL,
          allowNull: false
        },
        priceCurrencyCode: {
          type: Sequelize.DataTypes.STRING(3),
          allowNull: false
        },
        itemTypeId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "itemTypes",
            },
            key: "id",
          },
        },
        cuisineId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "cuisines",
            },
            key: "id",
          },
        },
        timeToPrepare: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        imagePath: {
          type: Sequelize.DataTypes.STRING(1000),
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
    await queryInterface.dropTable("items");
  },
};
