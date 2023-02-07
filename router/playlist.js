const express = require('express')
const { playlistController } = require('../controllers/playlistController')
const router = express.Router()


router.post('/:movieId', playlistController.addPlaylist)


module.exports = router