const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')
const {authentication} = require('../middleware/author')

router.post('/register', controller.register)



module.exports = router
