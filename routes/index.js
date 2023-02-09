const express = require("express");
const router = express();

const routesUser = require("./routesUser");
const routesMeme = require("./routesMeme");
const routesPost = require("./routesPost");

router.use("/", routesUser);
router.use("/memes", routesMeme);
router.use("/posts", routesPost);

module.exports = router;
