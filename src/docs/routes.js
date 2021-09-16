const user = require("../modules/user/doc");
const album = require("../modules/album/doc");
const file = require("../modules/file/doc");

module.exports = {
  paths: {
    ...user,
    ...album,
    ...file,
  },
};
