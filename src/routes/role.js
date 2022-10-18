const { getAllRoles } = require("../controllers/roles");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/role";

module.exports = (router) => {
  /**
   * @api {GET} /role Get all roles
   * @apiName Get all roles
   * @apiGroup Role
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   * @apiQuery {Number} page Page number
   * @apiQuery {Number} [limit] Send 0 to fetch all records without pagination. Values other than 0 are ignored
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.get(`${BASE_ROUTE}`, isSuperAdmin, getAllRoles);
};
