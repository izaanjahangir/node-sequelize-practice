const keys = require("./src/config/keys");

module.exports = {
  development: {
    username: keys.DATABASE.DB_USER,
    password: keys.DATABASE.DB_PWD,
    database: keys.DATABASE.DB_NAME,
    dialect: "mssql",
    dialectOptions: {
      options: {
        instanceName: keys.DATABASE.DB_INSTANCE,
      },
    },
  },
  staging: {
    username: keys.DATABASE.DB_USER,
    password: keys.DATABASE.DB_PWD,
    database: keys.DATABASE.DB_NAME,
    dialect: "mssql",
    dialectOptions: {
      options: {
        instanceName: keys.DATABASE.DB_INSTANCE,
      },
    },
  },
  production: {
    username: keys.DATABASE.DB_USER,
    password: keys.DATABASE.DB_PWD,
    database: keys.DATABASE.DB_NAME,
    dialect: "mssql",
    dialectOptions: {
      options: {
        instanceName: keys.DATABASE.DB_INSTANCE,
      },
    },
  },
};
