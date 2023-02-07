const express = require('express');
const UserController = require('../Controllers/userController');
const router = express.Router()


router.post("/google-login", UserController);

module.exports = router