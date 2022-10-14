const { createItem, getAllItems } = require("../controllers/item");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/item";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createItem);
  router.get(`${BASE_ROUTE}`, isSuperAdmin, getAllItems);
};
