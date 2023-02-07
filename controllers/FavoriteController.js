const { Favorite } = require("../models");

class FavoriteController {
  static async getFavorites(req, res, next) {
    try {
      const favorites = await Favorite.findAll();
      res.status(200).json(favorites);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = FavoriteController;
