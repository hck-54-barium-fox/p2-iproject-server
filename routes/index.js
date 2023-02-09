const express = require('express');
const CustomerController = require('../controllers/customerController');
const router = express.Router()
const UserController = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');

router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get('/animal',CustomerController.findAnimal);
router.get('/cat',CustomerController.findCat);
router.use(authentication)
router.get('/product',UserController.getProduct)
router.get('/pub/checkout',CustomerController.fetchCheckout);
router.post('/pub/buy/midtrans',CustomerController.checkout);
router.patch('/pub/paid/:id',CustomerController.paid);
router.delete('/pub/checkout/delete/:id',CustomerController.deleteCheckout);
router.post('/pub/product/buy/:id',CustomerController.buyProduct);


module.exports=router;
