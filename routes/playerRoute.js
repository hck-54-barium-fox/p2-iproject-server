const express = require('express')
const ControllerPlayer = require('../controllers/controllerPlayer')
const playerRoute = express.Router()

playerRoute.post('/', ControllerPlayer.getPlayerById)

module.exports = playerRoute