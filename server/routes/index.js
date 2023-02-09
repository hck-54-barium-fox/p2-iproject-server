const express = require('express');
const ProductController = require('../controllers/productController');
const UserController = require('../controllers/userController');
const authentication = require('../middleware/auth');
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(authentication)
router.get('/all', ProductController.getAllProduct)
router.get('/cpu', ProductController.getCPU)
router.get('/gpu', ProductController.getGPU)
router.get('/ram', ProductController.getRAM)
router.get('/mobo', ProductController.getMobo)
router.get('/psu', ProductController.getPSU)
router.get('/cart', ProductController.getCart)
router.delete('/cart', ProductController.delCart)
router.post('/addcart/:productId', ProductController.addToCart)
router.post('/midtranstoken', ProductController.generateMidtransToken)
module.exports = router