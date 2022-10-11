const { Sequelize } = require("sequelize");

const keys = require("../config/keys");

const sequelize = new Sequelize(
  keys.DATABASE.DB_NAME,
  keys.DATABASE.DB_USER,
  keys.DATABASE.DB_PWD,
  {
    dialect: "mssql",
    dialectOptions: {
      options: {
        instanceName: keys.DATABASE.DB_INSTANCE,
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.error(err));

module.exports = sequelize;
