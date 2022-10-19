const { updateAssignedKitchenValidation } = require("./validations");
const AssignedKitchen = require("../../models/AssignedKitchen");
const User = require("../../models/User");
const Role = require("../../models/Role");
const errorStrings = require("../../config/errorStrings");
const globalHelpers = require("../../utils/globalHelpers");
const constants = require("../../config/constants");
const Kitchen = require("../../models/Kitchen");

exports.updateAssignedKitchen = async (req, res, next) => {
  try {
    const validationErrors = updateAssignedKitchenValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const responses = await Promise.all([
      User.findByPk(req.body.userId),
      Role.findOne({ where: { code: constants.ROLE_CODE.CHEF } }),
    ]);
    const user = responses[0];
    const chefRole = responses[1];

    if (!user) {
      throw { message: errorStrings.USER_NOT_FOUND, status: 404 };
    }

    if (user.roleId !== chefRole.id) {
      throw { message: errorStrings.USER_NOT_CHEF, status: 400 };
    }

    const assignedKitchen = await AssignedKitchen.create({
      userId: user.id,
      kitchenId: req.body.kitchenId,
    });

    res.json({
      data: { assignedKitchen },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};

exports.getAllChefs = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const skipDoc = globalHelpers.calculateSkipDoc(page);
    const limit = globalHelpers.getLimit(req.query.limit);

    const chefRole = await Role.findOne({
      where: { code: constants.ROLE_CODE.CHEF },
    });
    const chefResponse = await User.findAndCountAll({
      order: [["createdAt", "desc"]],
      offset: skipDoc,
      limit: limit,
      where: {
        roleId: chefRole.id,
      },
      include: [
        {
          model: AssignedKitchen,
          as: "assignedKitchen",
          include: [
            {
              model: Kitchen,
              as: "kitchen",
            },
          ],
        },
      ],
    });

    const chefs = chefResponse.rows;
    const totalItems = chefResponse.count;
    const totalPages = globalHelpers.calculateTotalPage(totalItems, limit);

    res.json({
      data: {
        chefs,
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
