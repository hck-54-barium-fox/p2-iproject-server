const Controller = require("../controllers/controllerAuth");
const express = require('express');
const route = express.Router()

route.get("/", Controller.getInventory)
route.post("/",)


module.exports = route