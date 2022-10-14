const { createCuisine, getAllCuisine, editCuisine } = require("../controllers/cuisine");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/cuisine";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createCuisine);
  router.patch(`${BASE_ROUTE}`, isSuperAdmin, editCuisine);
  router.get(`${BASE_ROUTE}`, getAllCuisine);
};
