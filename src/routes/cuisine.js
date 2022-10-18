const {
  createCuisine,
  getAllCuisine,
  editCuisine,
} = require("../controllers/cuisine");
const { isSuperAdmin } = require("../middlewares/authMiddlewares");

const BASE_ROUTE = "/cuisine";

module.exports = (router) => {
  /**
   * @api {POST} /cuisine Create a new cuisine
   * @apiName Create a new cuisine
   * @apiGroup Cuisine
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   *
   * @apiBody {String} name Name of the cuisine
   * @apiBody {String} imagePath Image path of the cuisine obtained from upload api
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.post(`${BASE_ROUTE}`, isSuperAdmin, createCuisine);

  /**
   * @api {PATCH} /cuisine Update cuisine
   * @apiName Update cuisine
   * @apiGroup Cuisine
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   *
   * @apiBody {Number} id Id of the cuisine to edit
   * @apiBody {String} [name] Name of the cuisine
   * @apiBody {String} [imagePath] Image path of the cuisine obtained from upload api
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.patch(`${BASE_ROUTE}`, isSuperAdmin, editCuisine);

  /**
   * @api {GET} /cuisine Get all cuisines
   * @apiName Get all cuisines
   * @apiGroup Cuisine
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
  router.get(`${BASE_ROUTE}`, getAllCuisine);
};
