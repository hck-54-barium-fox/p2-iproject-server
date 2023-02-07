const express = require('express')
const ControllerUser = require('../controllers/controllerUser')
const userRoute = express.Router()

userRoute.post('/register', ControllerUser.postRegister)
userRoute.post('/login', ControllerUser.postLogin)

module.exports = userRoute


