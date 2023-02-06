const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.post('/register', userController.register)          // TODO - Add register static method
router.post('/login', userController.login)                // TODO - Add login static method
router.post('/google-login', userController.googleLogin)   // TODO - Add google login static method
router.post('/spotify-login', )                            // TODO - Add spotify static method *if time's feasible

module.exports = router