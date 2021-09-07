const User = require("../modules/user/Schema");

module.exports = async function (req, res, next) {
  let { token } = req.headers || req.body || req.query;
  let user = await User.findByIdAndToken(token);
  if (!user) {
    res.status(401).send("Unable to decode token");
    return;
  }
  req.user = user;
  next();
};
