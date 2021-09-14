const Mailer = require("../../util/Mailer");
const bcrypt = require("bcryptjs");
const cache = require("memory-cache");

let generateCode = async (user_id) => {
  let code = Math.random().toString(36).substring(6);
  let expire = 900000;
  let key = `${code}-${user_id.toString()}`;
  cache.put(key, code, expire, function (key, value) {
    console.log(key + " did " + value);
  });
  return code;
};

let verifyCode = async (code, user_id) => {
  let full = `${code}-${user_id.toString()}`;
  return new Promise((resolve, reject) => {
    let e = cache.get(full);
    if (!e) reject("Code Expired");
    resolve(e);
  });
};

let sendMail = async ({ to, user_id }) => {
  let code = await generateCode(user_id);
  let template = {
    subject: "Verify your email",
    html: `<div>verification code: <h3>${code}</h3></div>`,
    text: "Thanks for joining",
  };
  await Mailer.sendMail(to, template);
  return code;
};

let generateHash = (str) => {
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

let verifyHash = async (str, hash) => {
  const res = await bcrypt.compare(str, hash);
  if (!res) return Promise.reject("Did Not Match");
  return res;
};

module.exports = {
  generateCode,
  sendMail,
  verifyCode,
  generateHash,
  verifyHash,
};
