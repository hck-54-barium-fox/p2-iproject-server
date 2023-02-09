const { Router } = require('express')
const express = require('express')
const UserController = require('../controller/UserController')
const router = express.Router()
const { authentication } = require('../middleware/middleware')

router.post('/register', UserController.Register)
router.post('/login', UserController.Login)
router.get('/profile', authentication,UserController.getProfile)
router.patch('/subscribe', authentication,UserController.subscribe)
router.post('/generate-midtrans-token', authentication,UserController.midtransToken)

module.exports = router