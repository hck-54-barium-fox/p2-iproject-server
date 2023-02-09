const express = require('express')
const PlanetController = require('../controllers/PlanetController')
const router = express.Router()

router.get("/planets",PlanetController.readPlanets)
router.get("/planets/:id",PlanetController.readPlanetById)
router.get("/apod",PlanetController.getAPOD)
module.exports= router