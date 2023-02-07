const router = require('express').Router()
const routerCustomer = require("./customer")

router.use("/customers", routerCustomer)


module.exports = router