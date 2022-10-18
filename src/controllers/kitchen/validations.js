const globalHelpers = require("../../utils/globalHelpers");
const errorStrings = require("../../config/errorStrings");

exports.createKitchenValidation = (body) => {
  if (!globalHelpers.isNumber(body.kitchenNumber)) {
    return errorStrings.KITCHEN_NUMBER_REQUIRED;
  }
};
