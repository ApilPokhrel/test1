const Album = require("./Schema");
const Validation = require("../../util/Validation");
const Joi = require("@hapi/joi");

exports.add = async (req, res) => {
  let album = new Album({ name: req.body.name, creator: req.user._id });
  album = await album.save();
  res.json(album);
};

exports.get = async (req, res) => {
  let album = await Album.findById(req.params.id);
  res.json(album);
};

//list albums can be filtered by name with field q
exports.list = async (req, res) => {
  let paging = Validation.paging(req.query);
  let data = await Album.list(
    req.query.q
      ? { name: { $regex: new RegExp(`/^${req.query.q}/`), $options: "i" } }
      : null,
    paging
  );
  res.json(data);
};

exports.remove = async (req, res) => {
  let album = await Album.findByIdAndRemove(req.params.id);
  res.json(album);
};

exports.update = async (req, res) => {
  let album = await Album.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name } },
    { new: true }
  );
  res.json(album);
};

exports.validate = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().label("must supply name!"),
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
