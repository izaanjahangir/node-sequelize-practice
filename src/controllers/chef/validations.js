const globalHelpers = require("../../utils/globalHelpers");
const errorStrings = require("../../config/errorStrings");

exports.updateAssignedKitchenValidation = (body) => {
  if (!globalHelpers.isNumber(body.userId)) {
    return errorStrings.USER_ID_REQUIRED;
  }

  if (!globalHelpers.isNumber(body.kitchenId)) {
    return errorStrings.KITCHEN_ID_REQUIRED;
  }
};
