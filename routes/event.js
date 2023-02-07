const express = require('express')
const EventController = require('../controllers/eventController')
const eventRouter = express.Router()

eventRouter.get('/taxonomies', EventController.getAllTaxonomies)


module.exports = eventRouter