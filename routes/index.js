const express = require('express')
const { authentication } = require('../middleware/auth')
const cardRouter = require('./cardRoute')
const deckRoute = require('./deckRoute')
const playerRoute = require('./playerRoute')
const userRoute = require('./userRoute')
const youtubeRoute = require('./youtubeRoute')
const router = express.Router()

router.use('/', userRoute)
router.use('/cards', cardRouter)
router.use('/players', playerRoute)
router.use('/youtube', youtubeRoute)
router.use(authentication)
router.use('/mydeck', deckRoute)


module.exports = router