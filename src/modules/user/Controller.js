const AuthToken = require("../../util/AuthToken");
const User = require("./Schema");
const Joi = require("@hapi/joi");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findByCredentials(username, password);
  const accessToken = AuthToken.generateAccessToken(user);
  res.json({ user, accessToken });
};

exports.register = async (req, res) => {
  let { name, email, password, phone, address, roles, profile } = req.body;
  let payload = {};
  const emailUser = await User.findOne({ "contact.address": email });
  if (emailUser) {
    res.status(400);
    res.json({ message: "Email already taken" });
    return;
  }
  payload.name = name;
  payload.contact = [{ address: email, type: "email" }];
  if (phone) payload.contact.push({ address: phone, type: "phone" });
  payload.password = password;
  if (profile) payload.profile = profile;
  let user = new User(payload);
  const accessToken = AuthToken.generateAccessToken(user);
  user = await user.save();
  res.json({ user, accessToken });
};

exports.get = async (req, res) => {
  let user = await User.findById(req.params.id);
  res.json(user);
};

exports.getByContact = async (req, res) => {
  let query = { "contact.address": req.params.address };
  const user = await User.findOne(query);
  res.json(user);
};

exports.edit = async (req, res) => {
  let { name, email, phone, email_verified, phone_verified, status } = req.body;
  let payload = {};
  let contact = [];
  if (name) payload.name = name;
  if (email)
    contact.push({
      address: email,
      type: "email",
      is_verified: email_verified,
    });
  if (phone)
    contact.push({
      address: phone,
      type: "phone",
      is_verified: phone_verified,
    });
  if (email && phone) payload.contact = contact;
  if (status) payload.status = status;
  let user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: payload },
    { new: true }
  );
  res.json(user);
};

exports.delete = async (req, res) => {
  let user = await User.findByIdAndRemove(req.params.id);
  res.json(user);
};

exports.validateLogin = async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().required().label("must supply email address!"),
    password: Joi.string().required().label("must supply password"),
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

exports.validateRegister = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().label("must supply full name!"),
    email: Joi.string().required().label("must supply email address"),
    password: Joi.string()
      .required()
      .min(6)
      .label("password must be at least 6 character"),
    phone: Joi.string().required().label("must supply Phone number"),
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
