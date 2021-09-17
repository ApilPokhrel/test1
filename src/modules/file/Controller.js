const File = require("./Schema");
const Validation = require("../../util/Validation");
const UploadHandler = require("../../handler/Upload");
const multer = require("multer");
const ObjectId = require("mongoose").Types.ObjectId;

exports.upload = async (req, res) => {
  let results = [];
  UploadHandler.upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return Promise.reject(err);
    } else if (err) {
      return Promise.reject(err);
    } else {
      for (let f of req.files) {
        let filename = `${Date.now()}.${f.mimetype.split("/")[1]}`;
        await UploadHandler.uploadToS3(
          filename,
          f.buffer,
          f.mimetype,
          req.body.sizes
        );
        let file = new File({
          name: filename,
          origin: process.env.UPLOAD_ORIGIN,
          mimetype: f.mimetype,
          album: req.params.album,
        });
        file = await file.save();
        results.push(file);
      }
    }
    res.json(results);
  });
};

exports.add = async (req, res) => {
  let file = new File(req.body);
  file = await file.save();
  res.json(File);
};

exports.get = async (req, res) => {
  let file = await File.findById(req.params.id);
  res.json(file);
};

//list Files can be filtered by name with field q
exports.list = async (req, res) => {
  let q = Validation.paging(req.query);
  let data = await File.list({ album: new ObjectId(req.params.album) }, q);
  res.json(data);
};

exports.remove = async (req, res) => {
  let file = await File.findByIdAndRemove(req.params.id);
  res.json(file);
};

exports.update = async (req, res) => {
  let file = await File.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name } },
    { new: true }
  );
  res.json(file);
};

exports.validate = async (req, res, next) => {
  const schema = Joi.object().keys({
    origin: Joi.string().required().label("must supply origin!"),
  });

  const result = await schema.validate(req.body, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (result.error) {
    const error = result.error.details.map((err) => err.context.label);
    res.status(400);
    res.json(error);
    res.end();
  } else {
    next();
  }
};
