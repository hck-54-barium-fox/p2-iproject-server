const express = require('express');
const Controller = require('../Controllers/ControllerEvent');
const { authentication } = require('../middleware/auth');
const router = express.Router()



router.get('/sholat/:place', Controller.jadwalSholat )
router.get('/', Controller.jadwalKegiatan)
router.use(authentication)
router.get('/favorite', Controller.allFavorite)
router.post('/favorite/:id', Controller.favorite)

module.exports = router
