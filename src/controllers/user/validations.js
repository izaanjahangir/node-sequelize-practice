const errorStrings = require("../../config/errorStrings");
const globalHelpers = require("../../utils/globalHelpers");

exports.registerValidation = (body) => {
  if (globalHelpers.isStringBlank(body.firstName)) {
    return errorStrings.FIRST_NAME_REQUIRED;
  }

  if (globalHelpers.isStringBlank(body.lastName)) {
    return errorStrings.LAST_NAME_REQUIRED;
  }
};
