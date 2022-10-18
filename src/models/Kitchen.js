const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Kitchen = sequelize.define(
  "kitchen",
  {
    name: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    kitchenNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
  },
  { paranoid: true }
);

module.exports = Kitchen;
