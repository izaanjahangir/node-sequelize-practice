const { registerValidation } = require("./validations");
const User = require("../../models/User");

exports.registerUser = async (req, res, next) => {
  try {
    const validationErrors = registerValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    res.json({
      data: {
        user,
      },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e.message, status: e.status || 400 });
  }
};
