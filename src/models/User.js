const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

const sequelize = require("../utils/database");
const Role = require("./Role");

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
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(value, salt);

        this.setDataValue("password", passwordHash);
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shouldChangePassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { paranoid: true }
);

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = User;
