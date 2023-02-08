const express = require('express')
const EventController = require('../controllers/eventController')
const authentication = require('../middlewares/auth')
const eventRouter = express.Router()

eventRouter.use(authentication)
eventRouter.get('/taxonomies', EventController.getAllTaxonomies)
eventRouter.get('/events/:name', EventController.getEventDetail)
eventRouter.get('/hotels', EventController.getHotelByGeolocation)
eventRouter.get('/eventDetail/:id', EventController.getEventById)

module.exports = eventRouter