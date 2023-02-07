const CustomerController = require("../controller/customerController")

const router = require('express').Router()

router.post("/register", CustomerController.register)
router.post("/login", CustomerController.login)
router.post("/ig-login", CustomerController.loginByFacebook)


module.exports = router