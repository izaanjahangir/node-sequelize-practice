const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const ItemType = sequelize.define(
  "itemType",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
  },
  { paranoid: true }
);

module.exports = ItemType;
