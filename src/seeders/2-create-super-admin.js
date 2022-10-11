"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const transaction = await queryInterface.sequelize.transaction();
      // Password Hash for password = 12345678
      const PASSWORD_HASH =
        "$2a$10$4.urq3e7mTte5txSSXbXKuopfLAtNL/w0AkayRexTVMbx9PgTJmSC";
      const superAdminRole = await queryInterface.rawSelect(
        "roles",
        {
          where: {
            code: "super-admin",
          },
          transaction,
        },
        ["id"]
      );
      await queryInterface.bulkInsert(
        "users",
        [
          {
            firstName: "Super",
            lastName: "Admin",
            email: "izaan.jahangir@aciano.net",
            gender: "m",
            password: PASSWORD_HASH,
            roleId: superAdminRole,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { transaction }
      );
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([queryInterface.dropTable("users")]);
    });
  },
};
