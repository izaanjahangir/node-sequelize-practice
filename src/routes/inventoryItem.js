const {
  createInventoryItem,
  getInventoryItems,
} = require("../controllers/inventoryItem");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/inventory-item";

module.exports = (router) => {
  /**
   * @api {POST} /inventory-item Create a new inventory item
   * @apiName Create a new inventory item
   * @apiGroup Inventory Item
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   *
   * @apiBody {String} name Name of the item
   * @apiBody {String} unitOfMeasurement Unit of measurement for this type. For example kg/litre etc
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createInventoryItem);

  /**
   * @api {GET} /inventory-item Get all inventory items
   * @apiName Get all inventory items
   * @apiGroup Inventory Item
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
  router.get(`${BASE_ROUTE}`, isSuperAdmin, getInventoryItems);
};
