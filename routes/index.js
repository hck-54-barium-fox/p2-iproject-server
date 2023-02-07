const router = require('express').Router()
const routerCustomer = require("./customer")
const routerProduct = require("./product")

router.use("/customers", routerCustomer)
router.use("/products", routerProduct)

module.exports = router