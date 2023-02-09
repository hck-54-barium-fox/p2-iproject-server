const ControllerEvent = require("../controllers/controllerEvent");
const express = require('express');
const { authentication } = require("../middleWare/auth");
const route = express.Router()

// route.post("/qrCode", ControllerEvent.getQrCode)
route.use(authentication)
route.get("/", ControllerEvent.getAllEvent)
route.post("/createEvent", ControllerEvent.addEvent)
route.get("/:eventId", ControllerEvent.getEventDetails)


module.exports = route