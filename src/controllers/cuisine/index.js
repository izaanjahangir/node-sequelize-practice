const { createCuisineValidation } = require("./validations");
const Cuisine = require("../../models/Cuisine");
const globalHelpers = require("../../utils/globalHelpers");

exports.createCuisine = async (req, res, next) => {
  try {
    const validationErrors = createCuisineValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const cuisine = await Cuisine.create({
      name: req.body.name,
      imagePath: req.body.imagePath,
    });

    res.json({
      data: {
        cuisine,
      },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};

exports.getAllCuisine = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const skipDoc = globalHelpers.calculateSkipDoc(page);
    const limit = globalHelpers.getLimit(req.query.limit);

    const totalItems = await Cuisine.count();
    const cuisines = await Cuisine.findAll({
      order: [["name", "asc"]],
      offset: skipDoc,
      limit: limit,
    });

    const totalPages = globalHelpers.calculateTotalPage(totalItems, limit);

    res.json({
      data: {
        cuisines,
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
