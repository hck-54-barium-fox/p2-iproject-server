const express = require('express')
const PlayerController = require('../controller/PlayerController')
const router = express.Router()
const {authentication} = require('../middleware/middleware')

router.get('/', PlayerController.GetAllPlayers)
router.get('/:id', authentication,PlayerController.GetPlayer)
router.get('/third/:id', authentication, PlayerController.GetPlayerByThird)

module.exports = router