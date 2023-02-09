const express = require('express');
const router = express.Router()
const user = require('./user');
const event = require('./event');
const Controller = require('../Controllers/ControllerEvent');
const { authentication } = require('../middleware/auth');


router.use('/users', user)
router.use('/events', event )
router.use(authentication)
router.use('/midtoken_generate', Controller.midtoken_generate)
router.post('/donatur', Controller.donatur)

module.exports = router
