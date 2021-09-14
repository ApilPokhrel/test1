const router = require("express").Router();
const e = require("../../handler/Error");
const c = require("./Controller");
const auth = require("../../middleware/Auth");

router.get("/:album", e.catchErrors(c.list));

router.post("/:album", e.catchErrors(c.upload));

router.get("/:id", e.catchErrors(c.get));
router.patch("/:id", auth, e.catchErrors(c.update));
router.delete("/:id", auth, e.catchErrors(c.remove));

module.exports = router;
