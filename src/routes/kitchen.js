const { createKitchen, getAllKitchens } = require("../controllers/kitchen");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/kitchen";

module.exports = (router) => {
  /**
   * @api {POST} /kitchen Create a new kitchen
   * @apiName Create a new kitchen
   * @apiGroup Kitchen
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   *
   * @apiBody {String} [name] Name of the kitchen, if any
   * @apiBody {Number} kitchenNumber Number of kitchen
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createKitchen);

  /**
   * @api {GET} /kitchen Get all kitchens
   * @apiName Get all kitchens
   * @apiGroup Kitchen
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
  router.get(`${BASE_ROUTE}`, isSuperAdmin, getAllKitchens);
};
