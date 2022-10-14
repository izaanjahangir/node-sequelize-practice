const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");
const errorStrings = require("../../config/errorStrings");
const {
  addUserValidation,
  loginValidation,
  changePasswordValidation,
  changeRoleValidation,
} = require("./validations");
const User = require("../../models/User");
const Role = require("../../models/Role");
const { DEFAULT_PASSWORD } = require("../../config/constants");
const { loadTemplateAndSend } = require("../../utils/templateEmailer");
const globalHelpers = require("../../utils/globalHelpers");
const { sendMail } = require("../../utils/sendGrid");

exports.addUser = async (req, res, next) => {
  try {
    const validationErrors = addUserValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: DEFAULT_PASSWORD,
      gender: req.body.gender,
      roleId: req.body.roleId,
      shouldChangePassword: true,
    });

    const emailPayload = await loadTemplateAndSend("AccountCreated", {
      fullName: globalHelpers.concatenateName(user),
      email: req.body.email,
      password: DEFAULT_PASSWORD,
      link: keys.PORTAL_URL,
    });

    await sendMail({
      to: user.email,
      from: keys.APP_EMAIL,
      subject: emailPayload.subject,
      text: emailPayload.txtContent,
      html: emailPayload.htmlContent,
    });

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
    const page = req.query.page || 1;
    const skipDoc = globalHelpers.calculateSkipDoc(page);
    const limit = globalHelpers.getLimit(req.query.limit);

    const totalItems = await User.count();
    const users = await User.findAll({
      offset: skipDoc,
      limit: limit,
    });

    const totalPages = globalHelpers.calculateTotalPage(totalItems, limit);

    res.json({
      data: {
        users,
        totalPages,
        totalItems,
        currentPage: Number(page),
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
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
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

exports.changePassword = async (req, res, next) => {
  try {
    const validationErrors = changePasswordValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.currentPassword,
      req.user.password
    );

    if (!isPasswordCorrect) {
      throw { message: errorStrings.CURRENT_PASSWORD_WRONG, status: 401 };
    }

    req.user.password = req.body.newPassword;
    await req.user.save();

    res.json({
      data: {},
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};

exports.changeRole = async (req, res, next) => {
  try {
    const validationErrors = changeRoleValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const [numberOfAffectedRows] = await User.update(
      { roleId: req.body.roleId },
      {
        where: {
          id: req.body.userId,
        },
        limit: 1,
      }
    );

    if (numberOfAffectedRows === 0) {
      throw { message: errorStrings.USER_NOT_FOUND, status: 404 };
    }

    res.json({
      data: {},
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};
