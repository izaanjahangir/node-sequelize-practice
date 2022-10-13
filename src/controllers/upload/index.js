const keys = require("../../config/keys");

exports.handleUploadImage = async (req, res, next) => {
  try {
    res.json({
      data: {
        url: keys.ASSET_ROOT_URL + "/images/" + req.file.filename,
        path: "images/" + req.file.filename,
      },
      message: "success",
      success: true,
    });
  } catch (e) {
    next({ message: e, status: e.status || 400 });
  }
};
