const multer = require("multer");
const { handleUploadImage } = require("../controllers/upload");
const { isUser } = require("../middlewares/authMiddlewares");

const { imageMulterStorage } = require("../utils/multer");
const BASE_ROUTE = "/upload";
const imageUpload = multer({ storage: imageMulterStorage });

module.exports = (router) => {
  router.post(
    `${BASE_ROUTE}/image`,
    isUser,
    imageUpload.single("image"),
    handleUploadImage
  );
};
