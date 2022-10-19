const { updateAssignedKitchen, getAllChefs } = require("../controllers/chef");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/chef";

module.exports = (router) => {
  /**
   * @api {PATCH} /chef/assigned-kitchen Update kitchen assignment to chef
   * @apiName Update kitchen assignment to chef
   * @apiGroup Chef
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   *
   * @apiBody {String} userId Id of the chef
   * @apiBody {String} kitchenId Id of the kitchen
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.patch(
    `${BASE_ROUTE}/assigned-kitchen`,
    isSuperAdmin,
    updateAssignedKitchen
  );

  /**
   * @api {GET} /chef Get all chefs
   * @apiName Get all chefs
   * @apiGroup Chef
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   *
   * @apiQuery {Number} page Page number
   * @apiQuery {Number} [limit] Send 0 to fetch all records without pagination. Values other than 0 are ignored
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.get(`${BASE_ROUTE}`, isSuperAdmin, getAllChefs);
};
