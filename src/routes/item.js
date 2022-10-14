const { createItem, getAllItems, editItem } = require("../controllers/item");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/item";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createItem);
  router.patch(`${BASE_ROUTE}`, isSuperAdmin, editItem);
  router.get(`${BASE_ROUTE}`, isSuperAdmin, getAllItems);
};
