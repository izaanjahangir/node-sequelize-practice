const { createInventoryItem } = require("../controllers/inventoryItem");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/inventory-item";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createInventoryItem);
};
