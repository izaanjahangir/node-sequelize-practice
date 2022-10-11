const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");
const errorStrings = require("../../config/errorStrings");
const { addUserValidation, loginValidation } = require("./validations");
const User = require("../../models/User");
const { DEFAULT_PASSWORD } = require("../../config/constants");

exports.addUser = async (req, res, next) => {
  try {
    const validationErrors = addUserValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(DEFAULT_PASSWORD, salt);

    console.log("Computed hash =>", passwordHash);

    const user = User.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
      gender: req.body.gender,
      roleId: req.body.roleId,
    });
    await user.save();

    console.log("User is created");

    res.json({
      data: {
        user,
      },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({});

    res.json({
      data: {
        users,
      },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const validationErrors = loginValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      throw { message: errorStrings.INVALID_LOGIN_CREDENTIALS, status: 401 };
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw { message: errorStrings.INVALID_LOGIN_CREDENTIALS, status: 401 };
    }

    const token = jwt.sign({ userId: user.id }, keys.JWT_SECRET);

    res.json({
      data: {
        user,
        token,
      },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};
