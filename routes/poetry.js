const express = require('express');
const PaymentController = require('../Controllers/paymentController');
const PoetryController = require('../Controllers/PoetryController');
const router = express.Router()


router.get("/find/:search", PoetryController.getLetterPerSearch);
router.post("/payment/:letterId", PaymentController.payment)
router.get("/myletter", PoetryController.getMyLetter)



module.exports = router