const express = require("express");
const FavoriteController = require("../controllers/FavoriteController");
const router = express.Router();

router.get("/favorites", FavoriteController.getFavorites);

module.exports = router;
