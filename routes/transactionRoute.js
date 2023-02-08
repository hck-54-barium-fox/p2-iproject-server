const express = require("express");
const router = express.Router();
const Controller = require("../controllers/transactionController");
const {authentication, authorization} = require('../middlewear/auth')


router.get("/transactions", authentication, Controller.fetchDataTransactions)
router.post("/transactions/:smartphone", authentication, Controller.AddTransaction)
router.patch("/transactions/:id", authentication, Controller.handleStatus)
// router.post("/identityUsers/:id", authentication, authorization, upload.single("image"), Controller.handleIdentity)
router.post("/createMidtransToken/:price", authentication, Controller.createTokenMidtrans)


module.exports = router;