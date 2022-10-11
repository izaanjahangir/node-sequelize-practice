"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkInsert("roles", [
          {
            name: "Super Admin",
          },
          {
            name: "Waiter",
          },
          {
            name: "Chef",
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
