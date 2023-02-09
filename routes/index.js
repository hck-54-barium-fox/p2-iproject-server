const express = require('express')
const router = express.Router()
const RouterUser = require('../routes/UserRoute')
const RouterPlayer = require('../routes/PlayerRoute')

router.use('/', RouterUser)
router.use('/players', RouterPlayer)

module.exports = router