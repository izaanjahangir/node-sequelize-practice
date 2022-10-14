const { createItem } = require("../controllers/item");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/item";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createItem);
};
