const {
  addUser,
  getAllUsers,
  loginUser,
  changePassword,
  changeRole,
} = require("../controllers/user");
const { isSuperAdmin, isUser } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/user";

module.exports = (router) => {
  /**
   * @api {POST} /user Add user
   * @apiName Add user
   * @apiGroup User
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   * @apiBody {String} firstName First name of the user
   * @apiBody {String} lastName Last name of the user
   * @apiBody {String} gender Send either m or f
   * @apiBody {Number} roleId Role id
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.post(`${BASE_ROUTE}`, isSuperAdmin, addUser);

  /**
   * @api {GET} /user Get all users
   * @apiName Get all users
   * @apiGroup User
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
  router.get(`${BASE_ROUTE}`, isSuperAdmin, getAllUsers);
  router.post(`${BASE_ROUTE}/login`, loginUser);
  router.patch(`${BASE_ROUTE}/change-password`, isUser, changePassword);
  router.patch(`${BASE_ROUTE}/change-role`, isSuperAdmin, changeRole);
};
