const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()
const authentication = require("../middlewares/authentication")
const authorization = require('../middlewares/authorization')

router.post("/register", Controller.register)
router.post("/login", Controller.login)




module.exports = router