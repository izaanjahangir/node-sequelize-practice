const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");
const Item = require("./Item");

const ItemSpecification = sequelize.define(
  "itemSpecification",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { paranoid: true }
);

ItemSpecification.belongsTo(Item, { foreignKey: "itemId" });
Item.hasMany(ItemSpecification, { foreignKey: "itemId" });

module.exports = ItemSpecification;
