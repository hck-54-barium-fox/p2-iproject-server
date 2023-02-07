const express = require('express')
const { getEventsByTaxonomies } = require('../controllers/eventController')
const EventController = require('../controllers/eventController')
const eventRouter = express.Router()

eventRouter.get('/taxonomies', EventController.getAllTaxonomies)
eventRouter.get('/events', EventController.getAllEvents)


module.exports = eventRouter