const express = require('express')
const router = express.Router()
const customerRoute = require('./customerRoutes')


router.use('/customers', customerRoute )





module.exports = router