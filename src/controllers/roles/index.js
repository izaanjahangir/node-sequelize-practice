const Role = require("../../models/Role");
const globalHelpers = require("../../utils/globalHelpers");

exports.getAllRoles = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const skipDoc = globalHelpers.calculateSkipDoc(page);
    const limit = globalHelpers.getLimit(req.query.limit);

    const response = await Role.findAndCountAll({
      order: [["id", "asc"]],
      offset: skipDoc,
      limit: limit,
    });

    const totalItems = response.count;
    const roles = response.rows;
    const totalPages = globalHelpers.calculateTotalPage(totalItems, limit);

    res.json({
      data: {
        roles,
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
