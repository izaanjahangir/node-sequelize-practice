const { editInventoryValidation } = require("./validations");
const Inventory = require("../../models/Inventory");
const InventoryItem = require("../../models/InventoryItem");
const globalHelpers = require("../../utils/globalHelpers");

exports.editInventory = async (req, res, next) => {
  try {
    const validationErrors = editInventoryValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    let inventory = await Inventory.findOne({
      where: {
        inventoryItemId: req.body.inventoryItemId,
      },
    });

    if (!inventory) {
      inventory = await Inventory.create({
        inventoryItemId: req.body.inventoryItemId,
        amountAvailable: req.body.amount,
      });
    } else {
      await inventory.increment({ amountAvailable: req.body.amount });
    }

    await inventory.reload({
      include: [
        {
          model: InventoryItem,
          as: "inventoryItem",
        },
      ],
    });

    res.json({
      data: { inventory },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};

exports.fetchInventory = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const skipDoc = globalHelpers.calculateSkipDoc(page);
    const limit = globalHelpers.getLimit(req.query.limit);

    const inventoriesResponse = await Inventory.findAndCountAll({
      order: [["createdAt", "desc"]],
      offset: skipDoc,
      limit: limit,
      include: [
        {
          model: InventoryItem,
          as: "inventoryItem",
        },
      ],
    });

    const inventories = inventoriesResponse.rows;
    const totalItems = inventoriesResponse.count;
    const totalPages = globalHelpers.calculateTotalPage(totalItems, limit);

    res.json({
      data: { inventories, totalPages, totalItems, currentPage: Number(page) },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};
