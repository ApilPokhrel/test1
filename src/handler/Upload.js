const multer = require("multer");
const storage = multer.memoryStorage();
const path = require("path");
const AWS = require("aws-sdk");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.join(__dirname, "../../uploads"));
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    let filename = `${Date.now()}.${file.mimetype.split("/")[1]}`;
    cb(null, filename);
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

exports.uploadToS3 = (fileName, buffer, type, szs) => {
  return new Promise((resolve, reject) => {
    let credentials = {
      accessKeyId: process.env.AWS_ACCESS,
      secretAccessKey: process.env.AWS_SECRET,
      region: process.env.AWS_REGION,
      signatureVersion: "v4",
    };

    const s3 = new AWS.S3(credentials);
    let params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Body: buffer,
      ACL: "public-read",
      ContentType: type,
    };

    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
