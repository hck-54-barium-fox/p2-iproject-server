const express = require('express')
const router = express.Router()
const weaponController = require('../controller/weaponController')

router.get('/weapons', weaponController.readWeapon)
router.get('/weapons/:id', weaponController.weaponById)




module.exports = router