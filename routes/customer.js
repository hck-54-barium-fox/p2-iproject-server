const CustomerController = require("../controller/customerController")

const router = require('express').Router()

router.post("/register", CustomerController.register)



module.exports = router