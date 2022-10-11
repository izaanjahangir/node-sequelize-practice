"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkInsert("roles", [
          {
            name: "Super Admin",
            code: "super-admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Waiter",
            code: "waiter",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Chef",
            code: "chef",
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
