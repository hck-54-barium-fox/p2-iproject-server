const express = require('express')
const router = express.Router()
const userRoutes = require("./user")
const planetRoutes = require("./planet")
const MidtransController = require('../controllers/MidtransController')
const { authentication } = require('../middlewares/auth')
const UserController = require('../controllers/UserController')

router.use(userRoutes)
router.use(authentication)
router.use(planetRoutes)
router.post("/transaction",MidtransController.getTransaction)
router.patch("/subscribe",MidtransController.userSubscribe)
module.exports = router