const express = require('express')
const Controller = require('../controllers/controllerProduct')
const router = express.Router()

router.get('/product',Controller.getallproduct)
router.get('/product/:id',Controller.detailProduct)



module.exports = router