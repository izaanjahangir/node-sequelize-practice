const errorStrings = require("../../config/errorStrings");
const globalHelpers = require("../../utils/globalHelpers");

exports.createCuisineValidation = (body) => {
  if (globalHelpers.isStringBlank(body.name)) {
    return errorStrings.NAME_REQUIRED;
  }

  if (globalHelpers.isStringBlank(body.imagePath)) {
    return errorStrings.IMAGE_REQUIRED;
  }
};

exports.editCuisineValidation = (body) => {
  if (!globalHelpers.isNumber(body.id)) {
    return errorStrings.ID_REQUIRED;
  }
};
