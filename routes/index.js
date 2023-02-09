const express = require('express')
const router = express.Router()
const customerRoute = require('./customerRoutes')
const carbonRoute = require('./carbonRoutes')
const productRoute = require('./productRoutes')
const auhentication = require('../middlewares/auth')


router.use('/', customerRoute )

router.use('/carbon', carbonRoute)

router.use(auhentication)
router.use('/products', productRoute)



module.exports = router