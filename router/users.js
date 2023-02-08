const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.post('/register', userController.register)          
router.post('/login', userController.login)                
router.post('/google-login', userController.googleLogin) 
router.post('/spotify-login', )                            

module.exports = router