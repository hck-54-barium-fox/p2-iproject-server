const ControllerEvent = require("../controllers/controllerEvent");
const express = require('express');
const { authentication, authorization } = require("../middleWare/auth");
const route = express.Router()

// route.post("/qrCode", ControllerEvent.getQrCode)
route.use(authentication)
route.get("/", ControllerEvent.getAllEvent)
route.post("/createEvent", ControllerEvent.addEvent)
route.get("/:eventId", ControllerEvent.getEventDetails)
route.delete("/:eventId", authorization, ControllerEvent.deleteEvent)
route.patch("/:eventId", authorization, ControllerEvent.updateStatus)


module.exports = route