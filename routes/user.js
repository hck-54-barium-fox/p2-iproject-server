const express = require('express');
const UserController = require('../Controllers/UserController');
const router = express.Router()


router.post("/google-login", UserController);

module.exports = router