const express = require('express')
const router = express.Router()
const routeItems = require('./items')
const routeUsers = require('./users')
const routeCategories = require('./categories')

router.use('/items', routeItems)
router.use('/users', routeUsers)
router.use('/categories', routeCategories)


module.exports = router