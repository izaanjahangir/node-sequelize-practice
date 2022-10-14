const { createItemValidation } = require("./validations");
const Item = require("../../models/Item");
const ItemType = require("../../models/ItemType");
const Cuisine = require("../../models/Cuisine");
const ItemSpecification = require("../../models/ItemSpecification");
const globalHelpers = require("../../utils/globalHelpers");

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

    if (req.body.specifications && req.body.specifications.length) {
      const specifications = req.body.specifications.map((spec) => ({
        name: spec.name,
        value: spec.value,
        itemId: item.id,
      }));

      await ItemSpecification.bulkCreate(specifications);
    }

    await item.reload({
      include: [
        {
          model: Cuisine,
          as: "cuisine",
        },
        {
          model: ItemType,
          as: "itemType",
        },
        {
          model: ItemSpecification,
          as: "itemSpecifications",
        },
      ],
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

exports.getAllItems = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const skipDoc = globalHelpers.calculateSkipDoc(page);
    const limit = globalHelpers.getLimit(req.query.limit);

    const totalItems = await Item.count();
    const items = await Item.findAll({
      order: [["name", "asc"]],
      offset: skipDoc,
      limit: limit,
      include: [
        {
          model: Cuisine,
          as: "cuisine",
        },
        {
          model: ItemType,
          as: "itemType",
        },
        {
          model: ItemSpecification,
          as: "itemSpecifications",
        },
      ],
    });

    const totalPages = globalHelpers.calculateTotalPage(totalItems, limit);

    res.json({
      data: { items, totalPages, totalItems, currentPage: Number(page) },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};
