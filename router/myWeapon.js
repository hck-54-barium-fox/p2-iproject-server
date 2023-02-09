const express = require('express')
const myWeaponController = require('../controller/myWeapon')
const router = express.Router()


router.get('/', myWeaponController.readMyWeapon)
router.post('/midtransToken/:id', myWeaponController.midtransPayment)
router.post('/:weaponId', myWeaponController.addMyWeapon)
router.patch('/:id', myWeaponController.statusWeapon)
router.delete('/:id', myWeaponController.deleteWeapon)



module.exports = router