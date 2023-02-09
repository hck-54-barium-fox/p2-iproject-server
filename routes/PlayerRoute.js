const express = require('express')
const PlayerController = require('../controller/PlayerController')
const router = express.Router()
const {authentication, authorization} = require('../middleware/middleware')

router.get('/', PlayerController.GetAllPlayers)
router.get('/:id', authentication, authorization,PlayerController.GetPlayer)
router.get('/third/:id', authentication, authorization,PlayerController.GetPlayerByThird)

module.exports = router