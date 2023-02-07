const express = require('express');
const CustomerController = require('../controllers/customerController');
const router = express.Router()
const UserController = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');

router.post('/register',UserController.register);
router.post('/login',UserController.login);


router.use(authentication)
router.get('/product',UserController.getProduct)

router.get('/categories',UserController.getCategory);
router.post('/product/add',UserController.addProduct);
router.get('/animal',CustomerController.findAnimal);
router.get('/cat',CustomerController.findCat);
router.post('/pub/product/buy/:id',CustomerController.buyProduct);
router.post('/pub/product/:id',CustomerController.detailProduct);


module.exports=router;
