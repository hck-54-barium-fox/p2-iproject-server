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

  static async postFavorites(req, res, next) {
    try {
      const { id } = req.user;
      const { title, ingredients, servings, instructions } = req.body;
      const favorites = await Favorite.create({
        title,
        ingredients,
        servings,
        instructions,
        UserId: id,
      });
      res.status(201).json(favorites);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = FavoriteController;
