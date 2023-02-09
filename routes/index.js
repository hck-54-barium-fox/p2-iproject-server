const express = require("express");
const { authentication } = require("../middlewares/auth.js");
const router = express.Router();
const routeUser = require("./user.js");
const routePoem = require("./poetry.js");
const QuoteController = require("../controllers/quoteController.js");

// middleware that is specific to this router
router.use("/user", routeUser);
router.use(authentication);
router.get("/randomquote", QuoteController.getRandomQuote)
router.use("/poetry", routePoem);

module.exports = router;
