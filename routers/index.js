const express = require('express');
const router = express.Router()
const user = require('./user');
const event = require('./event');


router.use('/users', user)
router.use('/events', event )


module.exports = router
