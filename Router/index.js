const express = require('express')
const router = express.Router()
const routerUser = require('./RouterUser')
const routerProduct = require('./RouterProduct')

router.use('/',routerUser)
router.use('/',routerProduct)

module.exports = router

