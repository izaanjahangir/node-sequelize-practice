const errorStrings = require("../../config/errorStrings");
const globalHelpers = require("../../utils/globalHelpers");

exports.addUserValidation = (body) => {
  if (globalHelpers.isStringBlank(body.firstName)) {
    return errorStrings.FIRST_NAME_REQUIRED;
  }

  if (globalHelpers.isStringBlank(body.lastName)) {
    return errorStrings.LAST_NAME_REQUIRED;
  }

  if (!globalHelpers.isValidEmail(body.email)) {
    return errorStrings.INVALID_EMAIL;
  }

  if (!globalHelpers.isValidGender(body.gender)) {
    return errorStrings.INVALID_GENDER;
  }

  if (!globalHelpers.isNumber(body.roleId)) {
    return errorStrings.ROLE_ID_REQUIRED;
  }
};

exports.loginValidation = (body) => {
  if (!globalHelpers.isValidEmail(body.email)) {
    return errorStrings.INVALID_EMAIL;
  }

  if (globalHelpers.isStringBlank(body.password)) {
    return errorStrings.PASSWORD_REQUIRED;
  }
};

exports.changePasswordValidation = (body) => {
  if (globalHelpers.isStringBlank(body.currentPassword)) {
    return errorStrings.CURRENT_PASSWORD_REQUIRED;
  }

  if (globalHelpers.isStringBlank(body.newPassword)) {
    return errorStrings.NEW_PASSWORD_REQUIRED;
  }

  if (body.newPassword === body.currentPassword) {
    return errorStrings.BOTH_PASSWORD_SAME;
  }
  
  if (body.newPassword.length < 8) {
    return errorStrings.PASSWORD_LENGTH;
  }
};
