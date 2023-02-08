const express = require('express')
const midtransController = require('../controllers/midtransController')
const router = express.Router()

router.post('/:id', midtransController.generatePayment)








module.exports = router