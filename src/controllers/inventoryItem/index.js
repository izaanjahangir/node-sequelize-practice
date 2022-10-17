const { createInventoryItemValidation } = require("./validations");
const globalHelpers = require("../../utils/globalHelpers");
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

exports.getInventoryItems = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const skipDoc = globalHelpers.calculateSkipDoc(page);
    const limit = globalHelpers.getLimit(req.query.limit);

    const totalItems = await InventoryItem.count();
    const inventoryItems = await InventoryItem.findAll({
      order: [["name", "asc"]],
      offset: skipDoc,
      limit: limit,
    });

    const totalPages = globalHelpers.calculateTotalPage(totalItems, limit);

    res.json({
      data: {
        inventoryItems,
        totalPages,
        totalItems,
        currentPage: Number(page),
      },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};
