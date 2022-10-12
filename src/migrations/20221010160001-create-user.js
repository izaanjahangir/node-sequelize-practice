"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("users", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
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
          references: {
            model: {
              tableName: "roles",
            },
            key: "id",
          },
        },
        password: {
          type: Sequelize.DataTypes.CHAR(60),
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
        shouldChangePassword: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
        },
      });
    } catch (e) {
      console.log("E.original.errors =>", e.original.errors);
      throw new Error(e);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
