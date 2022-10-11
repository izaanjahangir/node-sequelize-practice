const bcrypt = require("bcryptjs");

const { addUserValidation } = require("./validations");
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
