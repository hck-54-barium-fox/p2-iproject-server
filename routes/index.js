const express = require('express')
const router = express.Router()
const customer = require('./customer')


router.use('/', customer)

module.exports = router