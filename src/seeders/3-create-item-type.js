"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkInsert("itemTypes", [
          {
            name: "Food",
            code: "f",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Beverage",
            code: "b",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([queryInterface.dropTable("itemTypes")]);
    });
  },
};
