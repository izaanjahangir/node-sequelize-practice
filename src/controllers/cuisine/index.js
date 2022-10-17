const {
  createCuisineValidation,
  editCuisineValidation,
} = require("./validations");
const Cuisine = require("../../models/Cuisine");
const globalHelpers = require("../../utils/globalHelpers");
const errorStrings = require("../../config/errorStrings");

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

    const cuisinesResponse = await Cuisine.findAndCountAll({
      order: [["name", "asc"]],
      offset: skipDoc,
      limit: limit,
    });

    const cuisines = cuisinesResponse.rows;
    const totalItems = cuisinesResponse.count;
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

exports.editCuisine = async (req, res, next) => {
  try {
    const validationErrors = editCuisineValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const cuisine = await Cuisine.update(
      { ...req.body },
      {
        where: {
          id: req.body.id,
        },
        limit: 1,
        returning: true,
      }
    );

    if (cuisine[0] === 0) {
      throw { message: errorStrings.CUISINE_NOT_FOUND, status: 404 };
    }

    res.json({
      data: {
        cuisine: cuisine[1][0],
      },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};
