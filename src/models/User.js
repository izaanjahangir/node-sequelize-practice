const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define(
  "user",
  {
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      validate: {
        len: [1, 1],
      },
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {}
);

// User.sync()
//   .then((res) => console.log("Done syncing user mode"))
//   .catch((err) => console.error("Error syncing user model =>", err));

module.exports = User;
