const express = require('express')
const ControllerPhone = require('../controllers/smartPhoneController')
const router = express.Router()


router.get('/smartphones', ControllerPhone.getAllSmartphone)
router.get('/smartphones/:id', ControllerPhone.detailPhoneById)


module.exports = router