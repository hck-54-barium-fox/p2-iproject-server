const express = require('express')
const mainController = require('../controllers/mainController')
const { authentication } = require('../middlewares/auth')
const router = express.Router()

router.use(authentication)
router.post('/weather', mainController.getWeather)
router.post('/suggestAI', mainController.generateAIAnswer)
router.post('/playlist', mainController.fetchPlaylist)
router.post('/tracks', mainController.fetchTracks)

router.post('/payment', ) // TODO - Add payment gateway static method

module.exports = router