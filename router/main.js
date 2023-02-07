const express = require('express')
const mainController = require('../controllers/mainController')
const { authentication } = require('../middlewares/auth')
const router = express.Router()

router.use(authentication)
router.get('/weather', mainController.getWeather)
router.get('/suggestAI', )
router.get('/playlist', mainController.fetchPlaylist)          // TODO - Add recommend playlist static method
router.get('/tracks', mainController.fetchTracks)


router.post('/payment', )           // TODO - Add payment gateway static method

module.exports = router