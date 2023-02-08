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

  static async getPostById(req, res, next) {
    try {
      const id = req.params.id;
      const getPostByIdData = await Post.findOne({
        where: {
          id: id,
        },
      });

      res.status(200).json(getPostByIdData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postLike(req, res, next) {
    try {
      const postId = req.params.id;

      const userId = req.user.id;

      const checkIdPost = await Post.findOne({
        where: {
          id: postId,
        },
      });

      if (!checkIdPost) {
        throw { name: "data-not-found" };
      }

      const checkIdLike = await Like.findOne({
        where: {
          UserId: userId,
          PostId: postId,
        },
      });

      // console.log(checkIdLike, "<<<<<<<<<<<<<<<<");
      // console.log(userId, "ididiidid");

      if (checkIdLike != null) {
        throw { name: "not-double" };
      }

      const resultLike = await Like.create({
        UserId: userId,
        PostId: postId,
      });

      const resLike = await Like.findOne({
        where: {
          id: resultLike.id,
        },
      });

      res.status(201).json(resLike);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = PostController;
