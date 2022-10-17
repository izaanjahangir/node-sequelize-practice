const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const InventoryItem = sequelize.define(
  "inventoryItem",
  {
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    unitOfMeasurement: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  { paranoid: true }
);

module.exports = InventoryItem;
