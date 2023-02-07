const express = require("express");
const PaymentController = require("../Controllers/paymentController");
const PoetryController = require("../Controllers/PoetryController");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

const router = express.Router();

router.post(
  "/upload-image/:letterId",
  upload.single("image"),
  PoetryController.uploadImage
);
router.get("/find/:search", PoetryController.getLetterPerSearch);
router.post("/payment/:letterId", PaymentController.payment);
router.get("/myletter", PoetryController.getMyLetter);
router.get("/letterbyid/:letterId", PoetryController.letterById);
router.post("/sendemail/:letterId", PoetryController.sendEmail);

// router.post("/send/")

module.exports = router;
