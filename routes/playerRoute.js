const express = require('express')
const ControllerPlayer = require('../controllers/controllerPlayer')
const playerRoute = express.Router()

playerRoute.get('/:tag', ControllerPlayer.getPlayerById)

module.exports = playerRoute