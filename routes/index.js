const express = require('express')
const router = express.Router()
const routeUser = require("./user.js");

// middleware that is specific to this router
router.use("/user", routeUser)

module.exports = router