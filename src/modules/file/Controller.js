const File = require("./Schema");
const Validation = require("../../util/Validation");
const UploadHandler = require("../../handler/Upload");

exports.upload = async (req, res) => {
  UploadHandler.upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log("Multer error ", err);
    } else if (err) {
      console.log("Error while uploading ", err);
    } else {
      for (let f of req.files) {
        await File.uploadToS3(`${Date.now()}`, f.buffer, f.mimetype);
      }
    }
    res.json("success");
  });
};

let add = async (req, res) => {
  let file = new File(req.body);
  file = await file.save();
  res.json(File);
};

exports.add = add;

exports.get = async (req, res) => {
  let file = await File.findById(req.params.id);
  res.json(file);
};

//list Files can be filtered by name with field q
exports.list = async (req, res) => {
  let q = Validation.list(req.query.q, req.query);
  let data = await File.list(q);
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
    name: Joi.string().required().label("must supply name!"),
    mimetype: Joi.string().required().label("must supply mimetype!"),
    origin: Joi.string().required().label("must supply origin!"),
    album: Joi.string().required().label("must supply album"),
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
