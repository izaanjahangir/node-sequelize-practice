const errorStrings = require("../../config/errorStrings");
const globalHelpers = require("../../utils/globalHelpers");

exports.createCuisineValidation = (body) => {
  if (globalHelpers.isStringBlank(body.name)) {
    return errorStrings.NAME_REQUIRED;
  }

  if(globalHelpers.isStringBlank(body.imagePath)) {
    return errorStrings.IMAGE_REQUIRED
  }
};
