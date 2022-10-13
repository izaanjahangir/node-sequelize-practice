const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

const { ALLOWED_GENDERS } = require("../config/constants");

exports.getUniqueName = () => {
  return uuidv4().slice(0, 5) + "-" + Date.now();
};

exports.isStringBlank = (str = "") => {
  return str.trim().length === 0;
};

exports.isValidEmail = (email) => {
  if (!email || typeof email !== "string") {
    email = "";
  }

  return validator.isEmail(email);
};

exports.isValidGender = (gender) => {
  return ALLOWED_GENDERS.includes(gender);
};

exports.isNumber = (num) => {
  return typeof num === "number";
};

exports.concatenateName = (user) => {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  return (firstName + " " + lastName).trim();
};

exports.handleSequelizeError = (error) => {
  if (error?.name == "SequelizeUniqueConstraintError") {
    return error.original.toString();
  }

  if (typeof error === "object" && error.message) {
    return typeof error.message === "object"
      ? error.message.message
      : error.message;
  }

  return error;
};
