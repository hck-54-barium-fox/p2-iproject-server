const express = require('express');
const PoetryController = require('../Controllers/PoetryController');
const router = express.Router()


router.get("/find/:search", PoetryController.getLetterPerSearch);

module.exports = router