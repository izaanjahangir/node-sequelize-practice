const {
  addUser,
  getAllUsers,
  loginUser,
  changePassword,
} = require("../controllers/user");
const { isSuperAdmin, isUser } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/user";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}`, isSuperAdmin, addUser);
  router.get(`${BASE_ROUTE}`, getAllUsers);
  router.post(`${BASE_ROUTE}/login`, loginUser);
  router.patch(`${BASE_ROUTE}/change-password`, isUser, changePassword);
};
