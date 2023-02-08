const express = require('express')
const router = express.Router()
const userRoutes = require("./user")
const planetRoutes = require("./planet")
const MidtransController = require('../controllers/MidtransController')
const { authentication } = require('../middlewares/auth')

router.use(userRoutes)
router.use(authentication)
router.use(planetRoutes)
router.post("/transaction",MidtransController.getTransaction)
router.patch("/subscribe",MidtransController.userSubscribe)
module.exports = router