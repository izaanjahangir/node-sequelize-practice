const errorStrings = require("../../config/errorStrings");
const globalHelpers = require("../../utils/globalHelpers");

exports.createInventoryItemValidation = (body) => {
  if (globalHelpers.isStringBlank(body.name)) {
    return errorStrings.NAME_REQUIRED;
  }

  if (globalHelpers.isStringBlank(body.unitOfMeasurement)) {
    return errorStrings.UNIT_OF_MEASUREMENT_REQUIRED;
  }
};
