const express = require('express')
const app = require('../app')
const Controller = require('../controllers/controller')
const router = express.Router()
const authentication = require("../middlewares/authentication")


router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.use(authentication)
router.get('/products', Controller.fetchProducts)





module.exports = router