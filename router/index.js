const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const weaponRoute = require('./weapon')
const myWeaponRoute = require('./myWeapon')
const { authentication } = require('../middleware/auth')


router.use('/', weaponRoute)
router.use('/user', userRoute)
router.use('/myWeapons', authentication, myWeaponRoute)

module.exports = router