const express = require('express')
const app = require('../app')
const Controller = require('../controllers/controller')
const router = express.Router()
const authentication = require("../middlewares/authentication")


router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.get('/products', Controller.fetchProducts)
router.use(authentication)
router.post('/products/:productId', Controller.addCart)





module.exports = router