const router = require("express").Router();
const user = require("./modules/user/Routes");
const album = require("./modules/album/Routes");
const file = require("./modules/file/Routes");

router.use("/user", user);
router.use("/album", album);
router.use("/file", file);

module.exports = router;
