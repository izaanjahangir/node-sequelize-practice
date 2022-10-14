const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

const { ALLOWED_GENDERS, LIMIT } = require("../config/constants");

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

exports.calculateTotalPage = (totalDocs, limit) => {
  if (limit === 0 || totalDocs === 0) {
    return 1;
  }

  return Math.ceil(totalDocs / limit);
};

exports.getLimit = (limit) => {
  if (Number(limit) === 0) {
    return 0;
  }

  return LIMIT;
};

exports.calculateSkipDoc = (page) => {
  return (Number(page) - 1) * LIMIT;
};

exports.separateCRUDEntries = (entries) => {
  return entries.reduce(
    (acc, item) => {
      if (item.status === "create") acc.toCreate.push(item);
      if (item.status === "update") acc.toUpdate.push(item);
      if (item.status === "delete") acc.toDelete.push(item);

      return acc;
    },
    {
      toDelete: [],
      toUpdate: [],
      toCreate: [],
    }
  );
};
