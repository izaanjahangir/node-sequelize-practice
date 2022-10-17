const { createInventoryItemValidation } = require("./validations");
const InventoryItem = require("../../models/InventoryItem");

exports.createInventoryItem = async (req, res, next) => {
  try {
    const validationErrors = createInventoryItemValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const inventoryItem = await InventoryItem.create({
      name: req.body.name,
      unitOfMeasurement: req.body.unitOfMeasurement,
    });

    res.json({
      data: { inventoryItem },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};
