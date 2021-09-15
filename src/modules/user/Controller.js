const AuthToken = require("../../util/AuthToken");
const User = require("./Schema");
const Joi = require("@hapi/joi");
const Hash = require("../../util/Hash");
const C = require("../common/Controller");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findByCredentials(email, password);
  if (!user.is_verified) {
    C.sendMail({ to: email, user_id: user._id });
  }
  const accessToken = AuthToken.generateAccessToken(user);
  res.json({ user, accessToken });
};

exports.verifyCode = async (req, res) => {
  const { code } = req.body;
  await C.verifyCode(code, req.user._id);
  let email = req.user.contact.filter((e) => e.type === "email");
  let user = await User.findOneAndUpdate(
    { _id: req.user._id, "contact.address": email[0].address },
    { $set: { "contact.$.is_verified": true, is_verified: true } },
    { new: true }
  );
  res.json(user);
};

exports.sendCode = async (req, res) => {
  let user = req.user;
  let email = user.contact.filter((e) => e.type === "email");
  C.sendMail({ to: email[0].address, user_id: user._id });
  res.json(true);
};

exports.sendCodeUnverified = async (req, res) => {
  let { email } = req.body;
  let user = await User.findOne({ "contact.address": email });
  if (user) {
    C.sendMail({ to: email, user_id: email });
  }
  res.json(user);
};

exports.resetPass = async (req, res) => {
  const { code, password, email } = req.body;
  let user_id = email;
  await C.verifyCode(code, user_id);
  let hash = await C.generateHash(password);
  let user = await User.findOneAndUpdate(
    { "contact.address": email },
    { $set: { password: hash } },
    { new: true }
  );
  res.json(user);
};

exports.register = async (req, res) => {
  let { name, email, password } = req.body;
  let payload = {};
  const emailUser = await User.findOne({ "contact.address": email });
  if (emailUser) {
    res.status(400);
    res.json({ message: "Email already taken" });
    return;
  }
  payload.name = name;
  payload.contact = [{ address: email, type: "email" }];
  payload.password = password;
  let user = new User(payload);
  const accessToken = AuthToken.generateAccessToken(user);
  user = await user.save();
  C.sendMail({ to: email, user_id: user._id });
  res.json({ user, accessToken });
};

exports.resetPass = async (req, res) => {
  const { password } = req.body;
  let hash = await Hash.generatePassword(password);
  let user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { password: hash } },
    { new: true }
  );
  res.json(user);
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
    email: Joi.string().required().label("must supply email address!"),
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
