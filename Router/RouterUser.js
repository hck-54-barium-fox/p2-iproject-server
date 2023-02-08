const express = require('express')
const Controller = require('../controllers/controllerUser')
const router = express.Router()


router.post('/register',Controller.register)
router.post('/login',Controller.Login)
router.post('/google',Controller.googleLogin)

module.exports = router