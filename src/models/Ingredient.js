const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Item = require("./Item");
const InventoryItem = require("./InventoryItem");

const Ingredient = sequelize.define(
  "ingredient",
  {
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inventoryItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    indexes: [
      {
        fields: ["inventoryItemId", "itemId"],
        unique: true,
      },
    ],
  }
);

Ingredient.belongsTo(Item, { foreignKey: "itemId" });
Ingredient.belongsTo(InventoryItem, { foreignKey: "inventoryItemId" });
Item.hasMany(Ingredient);

module.exports = Ingredient;
