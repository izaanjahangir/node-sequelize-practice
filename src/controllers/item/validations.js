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

  const specificationArrayValidation = this.validateSpecificationArray(
    body.specifications
  );

  if (specificationArrayValidation) {
    return specificationArrayValidation;
  }
};

exports.validateSpecificationArray = (specifications = []) => {
  for (let i = 0; i < specifications.length; i++) {
    const item = specifications[i];

    if (globalHelpers.isStringBlank(item.name)) {
      return errorStrings.SPECIFICATION_NAME_REQUIRED;
    }

    if (globalHelpers.isStringBlank(item.value)) {
      return errorStrings.SPECIFICATION_VALUE_REQUIRED;
    }
  }
};

exports.editItemValidation = (body) => {
  if (!globalHelpers.isNumber(body.id)) {
    return errorStrings.ID_REQUIRED;
  }
};
