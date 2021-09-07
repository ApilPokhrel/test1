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
router.get("/:id", auth, e.catchErrors(c.get));
router.patch("/:id", auth, e.catchErrors(c.edit));
router.delete("/:id", auth, e.catchErrors(c.delete));

module.exports = router;
