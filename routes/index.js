const express = require('express');
const Controller = require('../controllers/userController');
const router = express.Router()
const UserController = require('../controllers/userController');

router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get('/product',UserController.getProduct)
router.post('/product/add',UserController.addProduct);


module.exports=router;
