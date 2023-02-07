const express = require('express')
const router = express.Router()
const RouterUser = require('../routes/UserRoute')

router.use('/', RouterUser)

module.exports = router