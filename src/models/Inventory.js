const { DataTypes } = require("sequelize");

const InventoryItem = require("./InventoryItem");
const sequelize = require("../utils/database");

const Inventory = sequelize.define(
  "inventory",
  {
    inventoryItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amountAvailable: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { paranoid: true }
);

Inventory.belongsTo(InventoryItem, { foreignKey: "inventoryItemId" });

module.exports = Inventory;
