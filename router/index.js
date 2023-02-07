const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const weaponRoute = require('./weapon')


router.use('/', weaponRoute)
router.use('/user', userRoute)

module.exports = router