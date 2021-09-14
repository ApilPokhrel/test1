const User = require("../modules/user/Schema");

module.exports = async function (req, res, next) {
  let allow = ["/api/v1/user/code"];
  let { token } = req.headers || req.body || req.query;
  let user = await User.findByToken(token);
  if (!user) {
    res.status(403).send("Unauthorized");
    return;
  }
  if (allow.indexOf(req.baseUrl + req.path) < 0) {
    if (!user.is_verified) {
      res.status(401).send("Not verified");
      return;
    }
  }
  req.user = user;
  next();
};
