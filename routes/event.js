const express = require('express')
const EventController = require('../controllers/eventController')
const eventRouter = express.Router()

eventRouter.get('/taxonomies', EventController.getAllTaxonomies)
eventRouter.get('/events/:name', EventController.getEventDetail)


module.exports = eventRouter