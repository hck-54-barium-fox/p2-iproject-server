const express = require("express");
const FavoriteController = require("../controllers/FavoriteController");
const router = express.Router();

router.get("/favorites", FavoriteController.getFavorites);
router.post("/favorites", FavoriteController.postFavorites);

module.exports = router;
