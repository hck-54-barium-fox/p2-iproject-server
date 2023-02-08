const express = require('express')
const ControllerDeck = require('../controllers/controllerDeck')
const { authorization } = require('../middleware/auth')
const deckRoute = express.Router()

deckRoute.get('/', ControllerDeck.getMyDeck)
deckRoute.post('/:id', ControllerDeck.postMyDeck)
deckRoute.use(authorization)
deckRoute.delete('/:id', ControllerDeck.deleteMyCardInDeck)

module.exports = deckRoute