const express = require('express')
const {authentication} = require('../middleware/aunth')
const router = express.Router()
const routerUsers = require('./users')
const routerMovies = require('./movies')
const routerPlaylist = require('./playlist')


router.use('/',routerUsers)
router.use( authentication )
router.use('/movies',routerMovies)
router.use('/playlist',routerPlaylist)


module.exports = router