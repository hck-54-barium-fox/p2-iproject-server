const express = require('express')
const ControllerDeck = require('../controllers/controllerDeck')
const deckRoute = express.Router()

deckRoute.get('/', ControllerDeck.getMyDeck)
deckRoute.post('/:id', ControllerDeck.postMyDeck)

module.exports = deckRoute