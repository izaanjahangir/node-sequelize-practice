const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Role = sequelize.define(
  "role",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {paranoid: true}
);

module.exports = Role;
