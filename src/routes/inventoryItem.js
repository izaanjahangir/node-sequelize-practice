const { createInventoryItem, getInventoryItems } = require("../controllers/inventoryItem");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/inventory-item";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createInventoryItem);
  router.get(`${BASE_ROUTE}`, isSuperAdmin, getInventoryItems);
};
