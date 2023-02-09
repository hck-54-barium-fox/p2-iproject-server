const express = require('express')
const ItemController = require('../controllers/itemController')
const authentication= require('../middlewares/auth')
const router = express.Router()

router.get('/compactDisc', ItemController.readCompactDisc)

router.get('/tShirt', ItemController.readTShirt)
router.use(authentication)
router.get('/', ItemController.readItems)
router.post('/', ItemController.addItems)
router.get('/:id', ItemController.detailsItem)
router.delete('/:id', ItemController.destroyItem)
router.put('/:id', ItemController.editItem)

module.exports = router