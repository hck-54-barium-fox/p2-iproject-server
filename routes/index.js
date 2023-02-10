const express = require('express')
const route = express.Router()
const routeEvent = require('./eventRoute');
const ControllerAuth = require('../controllers/controllerAuth');

route.use('/event', routeEvent)
route.post('/register', ControllerAuth.register)
route.post('/login', ControllerAuth.login)
route.post('/login-google', ControllerAuth.loginUserGoogle)
route.post('/login-facebook', ControllerAuth.loginUserFacebook)

module.exports = route