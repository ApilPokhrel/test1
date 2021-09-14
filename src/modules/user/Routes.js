const router = require("express").Router();
const e = require("../../handler/Error");
const c = require("./Controller");
const auth = require("../../middleware/Auth");

router.get(
  "/me",
  auth,
  e.catchErrors((req, res) => res.json(req.user))
);

router.post("/register", c.validateRegister, e.catchErrors(c.register));

router.post("/login", c.validateLogin, e.catchErrors(c.login));
router.post("/reset-pass", auth, e.catchErrors(c.resetPass));
router.get("/code", auth, e.catchErrors(c.sendCode));
router.post("/code", auth, e.catchErrors(c.verifyCode));
router.post("/sendcode", e.catchErrors(c.sendCodeUnverified));

router.get("/:id", auth, e.catchErrors(c.get));
router.patch("/:id", auth, e.catchErrors(c.edit));
router.delete("/:id", auth, e.catchErrors(c.delete));

module.exports = router;
