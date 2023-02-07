const { User, Post, Like } = require("../models/index");

class PostController {
  static async getAllPost(req, res, next) {
    try {
      const dataPost = await Post.findAll({
        include: [User, Like],
      });

      res.status(200).json(dataPost);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = PostController;
