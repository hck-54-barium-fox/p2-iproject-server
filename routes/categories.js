const express = require('express')
const CategoriesController = require('../controllers/categoriesController')
const router = express.Router()

router.get('/', CategoriesController.readCategories)

module.exports = router