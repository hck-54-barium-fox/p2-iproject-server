const ControllerEvent = require("../controllers/controllerEvent");
const express = require('express');
const route = express.Router()

route.get("/", ControllerEvent.getAllEvent)
route.post("/", ControllerEvent.addEvent)
route.get("/:eventId", ControllerEvent.getEventDetails)


module.exports = route