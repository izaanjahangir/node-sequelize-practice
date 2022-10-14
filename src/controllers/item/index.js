const { createItemValidation } = require("./validations");
const Item = require("../../models/Item");

exports.createItem = async (req, res, next) => {
  try {
    const validationErrors = createItemValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const item = await Item.create({
      name: req.body.name,
      itemTypeId: req.body.itemTypeId,
      cuisineId: req.body.cuisineId,
      timeToPrepare: req.body.timeToPrepare,
      imagePath: req.body.imagePath,
    });

    res.json({
      data: { item },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};
