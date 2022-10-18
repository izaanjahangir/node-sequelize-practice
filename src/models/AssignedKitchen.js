const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");
const User = require("./User");
const Kitchen = require("./Kitchen");

const AssignedKitchen = sequelize.define(
  "assignedKitchen",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kitchenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    indexes: [
      {
        fields: ["userId", "kitchenId"],
        unique: true,
      },
    ],
  }
);

AssignedKitchen.belongsTo(User, { foreignKey: "userId" });
AssignedKitchen.belongsTo(Kitchen, { foreignKey: "kitchenId" });
User.hasOne(AssignedKitchen, { foreignKey: "userId" });

module.exports = AssignedKitchen;
