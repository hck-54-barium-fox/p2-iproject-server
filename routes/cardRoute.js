const express = require('express')
const ControllerCard = require('../controllers/controllerCard')
const cardRouter = express.Router()

cardRouter.get('/', ControllerCard.fetchCard)

module.exports = cardRouter