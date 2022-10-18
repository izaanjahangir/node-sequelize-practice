const { createKitchenValidation } = require("./validations");
const Kitchen = require("../../models/Kitchen");
const globalHelpers = require("../../utils/globalHelpers");

exports.createKitchen = async (req, res, next) => {
  try {
    const validationErrors = createKitchenValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const kitchen = await Kitchen.create({
      name: req.body.name,
      kitchenNumber: req.body.kitchenNumber,
    });

    res.json({
      data: { kitchen },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};

exports.getAllKitchens = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const skipDoc = globalHelpers.calculateSkipDoc(page);
    const limit = globalHelpers.getLimit(req.query.limit);

    const itemsResponse = await Kitchen.findAndCountAll({
      order: [["kitchenNumber", "asc"]],
      offset: skipDoc,
      limit: limit,
    });

    const kitchens = itemsResponse.rows;
    const totalItems = itemsResponse.count;
    const totalPages = globalHelpers.calculateTotalPage(totalItems, limit);

    res.json({
      data: { kitchens, totalPages, totalItems, currentPage: Number(page) },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};
