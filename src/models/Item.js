const { DataTypes } = require("sequelize");

const keys = require("../config/keys");
const sequelize = require("../utils/database");
const ItemType = require("./ItemType");
const Cuisine = require("./cuisine");

const Item = sequelize.define(
  "item",
  {
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    itemTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cuisineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeToPrepare: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    priceCurrencyCode: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    imageURL: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.imagePath?.startsWith("http")) {
          return this.imagePath;
        }

        return `${keys.ASSET_ROOT_URL}/${this.imagePath}`;
      },
      set() {
        throw new Error("Do not try to set the `imageURL` value!");
      },
    },
  },
  { paranoid: true }
);

Item.belongsTo(ItemType, { foreignKey: "itemTypeId" });
Item.belongsTo(Cuisine, { foreignKey: "cuisineId" });

module.exports = Item;
