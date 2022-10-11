const path = require("path");

const envConfigPath = path.resolve(
  path.join(__dirname, "../", "../", "envConfig")
);
process.env["NODE_CONFIG_DIR"] = envConfigPath;

const config = require("config");

module.exports = {
  PORT: config.get("PORT"),
  DATABASE: {
    DB_USER: config.get("DATABASE").DB_USER,
    DB_PWD: config.get("DATABASE").DB_PWD,
    DB_NAME: config.get("DATABASE").DB_NAME,
    DB_INSTANCE: config.get("DATABASE").DB_INSTANCE,
  },
};
