const { createItem, getAllItems, editItem } = require("../controllers/item");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/item";

module.exports = (router) => {
  /**
   * @api {POST} /item Add a new f&b item
   * @apiName Add a new f&b item
   * @apiGroup Item
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   * @apiBody {String} name Name of the item
   * @apiBody {Number} itemTypeId Id of the item type
   * @apiBody {Number} cuisineId Id of the cuisine
   * @apiBody {Number} timeToPrepare Time to prepare the dish in seconds
   * @apiBody {String} imagePath Path of the image, obtained from upload api
   * @apiBody {Object[]} [specifications] Specifications should be an array of objects
   * @apiBody {String} specifications[name] Name of the specification
   * @apiBody {String} specifications[value] Value of the specification
   * @apiBody {Object[]} [ingredients] ingredients should be an array of objects
   * @apiBody {Number} ingredients[inventoryItemId] Inventory item id
   * @apiBody {Number} ingredients[amount] Amount of ingredient, can be in digits with two decimal places
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createItem);

  /**
   * @api {PATCH} /item Edit f&b item
   * @apiName Edit f&b item
   * @apiGroup Item
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   * @apiBody {Number} id Id of the item
   * @apiBody {String} [name] Name of the item
   * @apiBody {Number} [itemTypeId] Id of the item type
   * @apiBody {Number} [cuisineId] Id of the cuisine
   * @apiBody {Number} [timeToPrepare] Time to prepare the dish in seconds
   * @apiBody {String} [imagePath] Path of the image, obtained from upload api
   * @apiBody {Object[]} [specifications] Specifications should be an array of objects
   * @apiBody {String} specifications[status] Status of this specification, can be create|update|delete
   * @apiBody {String} specifications[id] Id of the specification, not needed for status = create
   * @apiBody {String} specifications[name] Name of the specification
   * @apiBody {String} specifications[value] Value of the specification
   * @apiBody {Object[]} [ingredients] ingredients should be an array of objects
   * @apiBody {Number} ingredients[inventoryItemId] Inventory item id
   * @apiBody {Number} ingredients[amount] Amount of ingredient, can be in digits with two decimal places
   * @apiBody {String} ingredients[status] Status of this ingredients, can be create|update|delete
   * @apiBody {String} ingredients[id] Id of the ingredients, not needed for status = create
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.patch(`${BASE_ROUTE}`, isSuperAdmin, editItem);

  /**
   * @api {GET} /item Get all f&b item
   * @apiName Get all f&b item
   * @apiGroup Item
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
  router.get(`${BASE_ROUTE}`, isSuperAdmin, getAllItems);
};
