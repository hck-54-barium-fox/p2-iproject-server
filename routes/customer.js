const express = require('express')
const app = require('../app')
const Controller = require('../controllers/controller')
const router = express.Router()
const authentication = require("../middlewares/authentication")


router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.get('/products', Controller.fetchProducts)
router.use(authentication)
router.get('/mycart', Controller.fetchMycart)
router.patch('/checkout', Controller.updateStatus)
router.get('/delivery/cities', Controller.rajaOngkir)
router.post('/delivery/fee', Controller.feeDelivery)
router.post('/generate-midtrans-token', Controller.midtrans)
router.delete('/mycart/:id', Controller.removeitem)
router.post('/products/:productId', Controller.addCart)






module.exports = router