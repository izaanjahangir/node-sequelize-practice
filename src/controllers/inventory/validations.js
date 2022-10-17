const errorStrings = require("../../config/errorStrings");
const globalHelpers = require("../../utils/globalHelpers");

exports.editInventoryValidation = (body) => {
  if (!globalHelpers.isNumber(body.inventoryItemId)) {
    return errorStrings.INVENTORY_ITEM_ID_REQUIRED;
  }

  if (!globalHelpers.isNumber(body.amount)) {
    return errorStrings.AMOUNT_REQUIRED;
  }
};
