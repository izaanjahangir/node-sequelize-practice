const { registerUser } = require("../controllers/user");

const BASE_ROUTE = "/user";

module.exports = (router) => {
  router.post(`${BASE_ROUTE}/register`, registerUser);
};
