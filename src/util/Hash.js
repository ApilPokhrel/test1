const bcrypt = require("bcryptjs");

exports.generatePassword = (str) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        reject(err);
      }
      bcrypt.hash(str, salt, function (errN, hash) {
        if (errN) {
          reject(errN);
        }
        resolve(hash);
      });
    });
  });
};

exports.verifyPassword = async (str, hash) => {
  const res = await bcrypt.compare(str, hash);
  if (!res) return Promise.reject("Did Not Match");
  return res;
};
