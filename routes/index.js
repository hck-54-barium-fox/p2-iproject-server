const express = require("express");
const { authentication } = require("../middlewares/auth.js");
const router = express.Router();
const routeUser = require("./user.js");
const routePoem = require("./poetry.js");

// middleware that is specific to this router
router.use("/user", routeUser);
router.use(authentication);
router.use("/poetry", routePoem);

module.exports = router;
