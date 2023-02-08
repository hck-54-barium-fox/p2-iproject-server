const express = require('express')
const router = express.Router()
const customerRoute = require('./customerRoutes')
const carbonRoute = require('./carbonRoutes')
const paymentRoute = require('./midtransRoute')
const auhentication = require('../middlewares/auth')


router.use('/', customerRoute )

router.use('/carbon', carbonRoute)

router.use(auhentication)
router.use('/payment', paymentRoute)



module.exports = router