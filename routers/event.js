const express = require('express');
const Controller = require('../Controllers/ControllerEvent');
const router = express.Router()



router.get('/sholat/:place', Controller.jadwalSholat )


module.exports = router
