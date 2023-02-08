const express = require("express");
const router = express.Router();
const customer = require("./customerRoute");
const smartphone = require('./smartPhoneRoute')

router.use("/", customer);
router.use("/", smartphone);



module.exports = router;