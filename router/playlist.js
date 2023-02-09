const express = require('express')
const { User } = require('../models/index')
const {google} = require('googleapis');
const { createToken } = require('../helpers/jwt');
const { playlistController } = require('../controllers/playlistController');
const router = express.Router()

router.get('/', playlistController.getAllPlaylist)
router.post('/:movieId', playlistController.addPlaylist)

module.exports = router