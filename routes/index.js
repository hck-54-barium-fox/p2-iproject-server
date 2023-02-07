const express = require('express')
const cardRouter = require('./cardRoute')
const playerRoute = require('./playerRoute')
const userRoute = require('./userRoute')
const youtubeRoute = require('./youtubeRoute')
const router = express.Router()

router.use('/', userRoute)
router.use('/cards', cardRouter)
router.use('/players', playerRoute)
router.use('/youtube', youtubeRoute)

module.exports = router