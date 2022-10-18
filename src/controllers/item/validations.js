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

  const ingredientsArrayValidation = this.validateIngredientsArray(
    body.ingredients
  );

  if (ingredientsArrayValidation) {
    return ingredientsArrayValidation;
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

exports.validateIngredientsArray = (ingredients = []) => {
  for (let i = 0; i < ingredients.length; i++) {
    const item = ingredients[i];

    if (!globalHelpers.isNumber(item.inventoryItemId)) {
      return errorStrings.INVENTORY_ITEM_ID_REQUIRED;
    }

    if (!globalHelpers.isNumber(item.amount)) {
      return errorStrings.AMOUNT_REQUIRED;
    }
  }
};

exports.editItemValidation = (body) => {
  if (!globalHelpers.isNumber(body.id)) {
    return errorStrings.ID_REQUIRED;
  }
};
