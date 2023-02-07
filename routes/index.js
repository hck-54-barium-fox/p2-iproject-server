const express = require('express')
const eventRouter = require('./event')
const userRouter = require('./user')
const router = express.Router()

router.use('/', userRouter)
router.use('/event', eventRouter)

module.exports = router