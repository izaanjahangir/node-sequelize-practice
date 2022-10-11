"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkInsert("users", [
          {
            firstName: "Super",
            lastName: "Admin",
            email: "izaan.jahangir@aciano.net",
            gender: "m",
            password: "12345678",
            roleId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ]),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([queryInterface.dropTable("users")]);
    });
  },
};
