const express = require('express')
const UserController = require('../controllers/userController')
const router = express.Router()
const  authentication  = require('../middlewares/auth')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.use(authentication)
router.get('/', UserController.fetchLoginUser)
router.patch('/status', UserController.updateStatus)
router.get('/midtrans', UserController.midtransToken)
router.post('/spotify', UserController.spotify)


module.exports = router