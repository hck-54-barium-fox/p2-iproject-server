const express = require('express')
const mainController = require('../controllers/mainController')
const { authentication } = require('../middlewares/auth')
const router = express.Router()

router.use(authentication)
router.get('/weather', mainController.getWeather)
router.get('/suggestAI', mainController.generateAIAnswer)
router.get('/playlist', mainController.fetchPlaylist)
router.get('/tracks', mainController.fetchTracks)

router.post('/payment', ) // TODO - Add payment gateway static method

module.exports = router