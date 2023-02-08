const express = require('express')
const ControllerPlayer = require('../controllers/controllerPlayer')
const playerRoute = express.Router()

playerRoute.get('/', ControllerPlayer.getPlayerById)

module.exports = playerRoute