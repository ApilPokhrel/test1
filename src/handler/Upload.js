const multer = require("multer");
const storage = multer.memoryStorage();
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname, "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

exports.upload = multer({
  storage: storage,
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");
    if (isPhoto || isVideo) {
      next(null, true);
    } else {
      next({ message: "type of file is not supported" }, false);
    }
  },
}).array("file", 12);
