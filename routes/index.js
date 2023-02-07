const express = require("express");
const router = express.Router();
const customer = require("./customerRoute");

router.use("/", customer);



module.exports = router;