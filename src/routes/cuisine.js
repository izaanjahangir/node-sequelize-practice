const { createCuisine } = require("../controllers/cuisine");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/cuisine";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createCuisine);
};
