const { addUser, getAllUsers, loginUser } = require("../controllers/user");
const isSuperAdmin = require("../middlewares/isSuperAdmin");

const BASE_ROUTE = "/user";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}`, isSuperAdmin, addUser);
  router.get(`${BASE_ROUTE}`, getAllUsers);
  router.post(`${BASE_ROUTE}/login`, loginUser);
};
