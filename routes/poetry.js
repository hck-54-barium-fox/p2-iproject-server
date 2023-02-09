const express = require("express");
const PaymentController = require("../controllers/paymentController");
const PoetryController = require("../controllers/poetryController");
const multer = require("multer");
const { authorization } = require("../middlewares/auth");

const upload = multer({ dest: "./public/uploads/" });

const router = express.Router();

router.post(
  "/upload-image/:letterId",
  authorization,
  upload.single("image"),
  PoetryController.uploadImage
);
router.delete("/cleanletter", PoetryController.destroyPoetry);
router.get("/find/:search", PoetryController.getLetterPerSearch);
router.post("/payment/:letterId", PaymentController.payment);
router.get("/myletter", PoetryController.getMyLetter);
router.get("/letterbyid/:letterId", PoetryController.letterById);
router.patch("/okaypayment/:letterId", PaymentController.okayPayment);
router.post("/sendemail/:letterId", authorization, PoetryController.sendEmail);

// router.post("/send/")

module.exports = router;
