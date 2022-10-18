const { editInventory, fetchInventory } = require("../controllers/inventory");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/inventory";

module.exports = (router) => {
  /**
   * @api {PATCH} /inventory Update inventory
   * @apiName Update inventory
   * @apiGroup Inventory
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   *
   * @apiBody {Number} inventoryItemId Id of item to update
   * @apiBody {Number} amountAvailable Available amount. Can be in digits with two decimal places
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.patch(`${BASE_ROUTE}`, isSuperAdmin, editInventory);

  /**
   * @api {GET} /inventory Get all inventories
   * @apiName Get all inventories
   * @apiGroup Inventory
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
  router.get(`${BASE_ROUTE}`, isSuperAdmin, fetchInventory);
};
