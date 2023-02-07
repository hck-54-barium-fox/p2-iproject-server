const express = require('express');
const Controller = require('../Controllers/ControllerUser');
const router = express.Router()

router.post('/login', Controller.googleLogin )





module.exports = router
