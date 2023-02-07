const express = require('express')
const Controller = require('../controllers/controllerUser')
const router = express.Router()


router.post('/register',Controller.register)
router.post('/login',Controller.Login)

module.exports = router