const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.post('/register', userController.register)          
router.post('/login', userController.login)                
router.post('/google-login', userController.googleLogin) 
router.get('/spotify-login', userController.spotifyLogin)                   
router.post('/spotify-login', userController.getAuthToken)                   
router.post('/me', userController.getMe)
router.post('/loginOrRegister', userController.spotifyFinalAuth)                   

module.exports = router