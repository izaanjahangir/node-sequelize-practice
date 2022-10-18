const { createKitchenValidation } = require("./validations");
const Kitchen = require("../../models/Kitchen");

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
