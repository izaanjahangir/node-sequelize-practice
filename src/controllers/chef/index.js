const { updateAssignedKitchenValidation } = require("./validations");
const AssignedKitchen = require("../../models/AssignedKitchen");
const User = require("../../models/User");
const Role = require("../../models/Role");
const errorStrings = require("../../config/errorStrings");

exports.updateAssignedKitchen = async (req, res, next) => {
  try {
    const validationErrors = updateAssignedKitchenValidation(req.body);

    if (validationErrors) {
      throw { message: validationErrors, status: 400 };
    }

    const responses = await Promise.all([
      User.findByPk(req.body.userId),
      Role.findOne({ where: { code: "chef" } }),
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
