const express = require('express')
const UserController = require('../controller/UserController')
const router = express.Router()

router.use('/register', UserController.Register)
router.use('/login', UserController.Login)

module.exports = router