const express = require('express')
const ControllerYoutube = require('../controllers/controllerYoutube')
const youtubeRoute = express.Router()

youtubeRoute.get('/', ControllerYoutube.fetchYoutubeVideo)

module.exports = youtubeRoute