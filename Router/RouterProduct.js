const express = require('express')
const Controller = require('../controllers/controllerProduct')
const authentication = require('../midlleware/authentication')
const router = express.Router()

router.get('/product',Controller.getallproduct)
router.use(authentication)
router.get('/myproduct',Controller.readMyproduct)
router.post('/generate-midtrans-token',Controller.generateToken)
router.get('/product/:id',Controller.detailProduct)
router.post('/myproduct/:id',Controller.addProduct)
router.delete('/myproduct',Controller.successPayment)



module.exports = router