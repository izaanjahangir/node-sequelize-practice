const path = require("path");

const envConfigPath = path.resolve(
  path.join(__dirname, "../", "../", `${process.env.NODE_ENV}.env`)
);

require("dotenv").config({ path: envConfigPath });

module.exports = {
  PORT: process.env.PORT,
  DATABASE: {
    DB_USER: process.env.DATABASE_USER,
    DB_PWD: process.env.DATABASE_PASSWORD,
    DB_NAME: process.env.DATABASE_NAME,
    DB_INSTANCE: process.env.DATABASE_INSTANCE,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  APP_EMAIL: process.env.APP_EMAIL,
  PORTAL_URL: process.env.PORTAL_URL,
  SERVER_ROOT_URL: process.env.SERVER_ROOT_URL,
  ASSET_ROOT_URL: process.env.SERVER_ROOT_URL + "/assets",
};
