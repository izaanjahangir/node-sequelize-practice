const { createItemValidation, editItemValidation } = require("./validations");
const Item = require("../../models/Item");
const ItemType = require("../../models/ItemType");
const Cuisine = require("../../models/Cuisine");
const ItemSpecification = require("../../models/ItemSpecification");
const globalHelpers = require("../../utils/globalHelpers");
const errorStrings = require("../../config/errorStrings");
const sequelize = require("../../utils/database");

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

    const itemsResponse = await Item.findAndCountAll({
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

    const items = itemsResponse.rows;
    const totalItems = itemsResponse.count;
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

exports.editItem = async (req, res, next) => {
  let transaction;

  try {
    const validationErrors = editItemValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    transaction = await sequelize.transaction();

    const itemUpdateResponse = await Item.update(
      { ...req.body },
      {
        where: {
          id: req.body.id,
        },
        returning: true,
        transaction,
      }
    );

    if (itemUpdateResponse[0] === 0) {
      throw { message: errorStrings.ITEM_NOT_FOUND, status: 404 };
    }

    const item = itemUpdateResponse[1][0];

    const { toCreate, toUpdate, toDelete } = globalHelpers.separateCRUDEntries(
      req.body.specifications
    );

    await Promise.all([
      ItemSpecification.bulkCreate(
        toCreate.map((spec) => ({ ...spec, itemId: item.id })),
        { transaction }
      ),
      ...toUpdate.map((spec) =>
        ItemSpecification.update(
          { ...spec },
          {
            where: {
              id: spec.id,
            },
            transaction,
          }
        )
      ),
      ItemSpecification.destroy({
        where: {
          id: toDelete.map((spec) => spec.id),
        },
        transaction,
      }),
    ]);

    await transaction.commit();
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
      data: { item: item },
      message: "success",
      success: true,
    });
  } catch (e) {
    await transaction.rollback();
    next({ message: e, status: e.status || 400 });
  }
};
