const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");
const User = require("./User");
const Item = require("./Item");

const AssignedFoodItem = sequelize.define(
  "assignedFoodItems",
  {
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    indexes: [
      {
        fields: ["userId", "itemId"],
        unique: true,
      },
    ],
  }
);

AssignedFoodItem.belongsTo(User, { foreignKey: "userId" });
AssignedFoodItem.belongsTo(Item, { foreignKey: "itemId" });
User.hasOne(AssignedFoodItem, { foreignKey: "userId" });
Item.hasOne(AssignedFoodItem, { foreignKey: "itemId" });

module.exports = AssignedFoodItem;
