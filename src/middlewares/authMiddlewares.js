const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const errorStrings = require("../config/errorStrings");
const keys = require("../config/keys");

exports.verifyToken = async (req) => {
  try {
    const authHeader = req.headers.authorization || "";
    const authToken = authHeader.split(" ")[1];

    if (!authToken) {
      throw { message: errorStrings.UNAUTHORIZED, status: 401 };
    }

    const decoded = jwt.verify(authToken, keys.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      throw { message: errorStrings.UNAUTHORIZED, status: 401 };
    }

    return user;
  } catch (e) {
    throw { message: e, status: e.status || 401 };
  }
};

exports.isUser = async (req, res, next) => {
  try {
    const user = await this.verifyToken(req);

    req.user = user;

    next();
  } catch (e) {
    next({ message: e, status: e.status || 401 });
  }
};

exports.isSuperAdmin = async (req, res, next) => {
  try {
    const user = await this.verifyToken(req);

    const adminRole = await Role.findOne({
      where: {
        code: "super-admin",
      },
    });

    if (!adminRole) {
      throw { message: errorStrings.SYSTEM_ERROR, status: 500 };
    }

    if (user.roleId !== adminRole.id) {
      throw { message: errorStrings.UNAUTHORIZED, status: 401 };
    }

    req.user = user;

    next();
  } catch (e) {
    next({ message: e, status: e.status || 401 });
  }
};
