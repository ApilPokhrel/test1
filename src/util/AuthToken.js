const jwt = require("jsonwebtoken");

class AuthToken {
  constructor() {}

  generateAccessToken({ _id }) {
    return jwt.sign(
      { _id: _id.toHexString(), access: "access" },
      process.env.AUTH_SECRET
    );
  }

  decodeAccessToken(token) {
    return new Promise((resolve, reject) => {
      if (!token) reject("AuthToken Undefined");
      jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });
  }
}

module.exports = new AuthToken();
