const express = require('express')
const ControllerCust = require('../controllers/custController')
const router = express.Router()


router.post('/register', ControllerCust.register)
router.post('/login', ControllerCust.login)
router.post("/googleSignIn", ControllerCust.googleSignIn);



module.exports = router