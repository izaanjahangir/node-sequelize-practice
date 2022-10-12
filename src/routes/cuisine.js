const { createCuisine, getAllCuisine } = require("../controllers/cuisine");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/cuisine";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createCuisine);
  router.get(`${BASE_ROUTE}`, getAllCuisine);
};
