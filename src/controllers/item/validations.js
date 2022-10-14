const errorStrings = require("../../config/errorStrings");
const globalHelpers = require("../../utils/globalHelpers");

exports.createItemValidation = (body) => {
  if (globalHelpers.isStringBlank(body.name)) {
    return errorStrings.NAME_REQUIRED;
  }

  if (!globalHelpers.isNumber(body.itemTypeId)) {
    return errorStrings.ITEM_TYPE_ID_REQUIRED;
  }

  if (!globalHelpers.isNumber(body.cuisineId)) {
    return errorStrings.CUISINE_ID_REQUIRED;
  }

  if (!globalHelpers.isNumber(body.timeToPrepare)) {
    return errorStrings.TIME_TO_PREPARE_REQUIRED;
  }

  if (globalHelpers.isStringBlank(body.imagePath)) {
    return errorStrings.IMAGE_REQUIRED;
  }
};
