const { addUser, getAllUsers, loginUser } = require("../controllers/user");

const BASE_ROUTE = "/user";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}`, addUser);
  router.get(`${BASE_ROUTE}`, getAllUsers);
  router.post(`${BASE_ROUTE}/login`, loginUser);
};
