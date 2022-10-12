const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Cuisine = sequelize.define(
  "cuisine",
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { paranoid: true }
);

module.exports = Cuisine;
