const express = require('express')
const router = express.Router()
const customerRoute = require('./customerRoutes')
const carbonRoute = require('./carbonRoutes')


router.use('/', customerRoute )

router.use('/carbon', carbonRoute)



module.exports = router