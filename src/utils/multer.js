const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const { getUniqueName } = require("./globalHelpers");

const ImagePathURL = path.resolve(
  path.join(__dirname, "../", "../", "uploads", "images")
);

fs.ensureDir(ImagePathURL)
  .then(() => {
    console.log("Ensured image upload directory is created!");
  })
  .catch(() => {
    console.log("Error creating image upload directory");
  });

const imageStorage = multer.diskStorage({
  destination: function (_, _file, cb) {
    cb(null, ImagePathURL);
  },
  filename: function (_, file, cb) {
    const originalName = file.originalname;
    const format = originalName.slice(originalName.lastIndexOf(".")) || ".jpg";

    const fileName = "image-" + getUniqueName() + format;
    cb(null, fileName);
  },
});

exports.imageMulterStorage = imageStorage;
