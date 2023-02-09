const express = require('express')
const { movieController } = require('../controllers/movieController')
const router = express.Router()

router.get('/', movieController.readAllMovies)
router.get('/trend', movieController.readTrendMovies)
router.get('/search', movieController.readSearchMovies)
router.get('/genre', movieController.readGenreMovies)
router.get('/top', movieController.readTopMovie)
router.get('/:id', movieController.getDetailMovie)

module.exports = router