const express = require("express");
const router = express.Router();
const customer = require("./customerRoute");
const smartphone = require('./smartPhoneRoute')
const transaction = require('./transactionRoute')

router.use("/", customer);
router.use("/", smartphone);
router.use("/", transaction)



module.exports = router;