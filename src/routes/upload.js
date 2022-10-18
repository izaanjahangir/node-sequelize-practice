const multer = require("multer");
const { handleUploadImage } = require("../controllers/upload");
const { isUser } = require("../middlewares/authMiddlewares");

const { imageMulterStorage } = require("../utils/multer");
const BASE_ROUTE = "/upload";
const imageUpload = multer({ storage: imageMulterStorage });

module.exports = (router) => {
  /**
   * @api {PATCH} /upload/image Upload image
   * @apiName Upload image
   * @apiGroup Upload
   *
   * @apiHeader {String} Authorization token should be sent. In the following pattern Bearer {Token} replace by real token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1N"
   *     }
   * @apiBody {File} image Image file
   *
   * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
   * @apiError success contains "false"
   */
  router.post(
    `${BASE_ROUTE}/image`,
    isUser,
    imageUpload.single("image"),
    handleUploadImage
  );
};
