const { editInventory } = require("../controllers/inventory");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/inventory";

module.exports = (router) => {
  router.patch(`${BASE_ROUTE}`, isSuperAdmin, editInventory);
};
