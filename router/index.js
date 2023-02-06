const express = require('express')
const router = express.Router()
const usersRouter = require('./users');
const mainRouter = require('./main');

router.use('/users', usersRouter)
router.use('/main', mainRouter)

module.exports = router