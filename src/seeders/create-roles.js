"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkInsert("roles", [
          {
            name: "Super Admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Waiter",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Chef",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([queryInterface.dropTable("roles")]);
    });
  },
};
