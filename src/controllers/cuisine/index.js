const { createCuisineValidation } = require("./validations");
const Cuisine = require("../../models/Cuisine");

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
    const cuisines = await Cuisine.findAll({});

    res.json({
      data: {
        cuisines,
      },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};
