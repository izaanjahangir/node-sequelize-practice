const { DataTypes } = require("sequelize");
const keys = require("../config/keys");
const sequelize = require("../utils/database");

const Cuisine = sequelize.define(
  "cuisine",
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.imagePath.startsWith("https")) {
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

module.exports = Cuisine;
