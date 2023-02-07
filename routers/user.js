const express = require('express');
const Controller = require('../Controllers/ControllerUser');
const router = express.Router()

router.post('/register', Controller.register )
router.post('/login', Controller.login )
// router.post('/googleLogin', Controller.googleLogin )





module.exports = router
