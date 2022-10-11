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
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {}
);

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

module.exports = User;
