const express = require("express");
const PaymentController = require("../controllers/PaymentController");
const router = express.Router();
const { User } = require("../models");
const midtransClient = require("midtrans-client");

router.post("/generate-midtrans-token", async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.user.id);
    if (findUser.isPurchased) {
      throw {
        name: "AlreadyPurchased",
      };
    }

    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });
    let parameter = {
      transaction_details: {
        order_id:
          "TRANSACTION-HAFOOD" + Math.floor(1000000 + Math.random() * 100000),
        gross_amount: 10000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: findUser.firstName,
        last_name: findUser.lastName,
        email: findUser.email,
        phone: findUser.phoneNumber,
      },
    };
    const midtransToken = await snap.createTransaction(parameter);
    res.status(200).json(midtransToken);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.patch("/payments", PaymentController.payment);

module.exports = router;
