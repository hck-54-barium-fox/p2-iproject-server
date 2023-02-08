const axios = require("axios");
const { Post } = require("../models/index");

class MemeController {
  static async getAllMemes(req, res, next) {
    try {
      const getMemesData = await axios({
        method: "get",
        url: `https://api.imgflip.com/get_memes`,
      });

      const dataMemes = getMemesData.data.data.memes;

      res.status(200).json(dataMemes);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getMemeById(req, res, next) {
    try {
      const memeId = req.params.memeId;

      const getMemesData = await axios({
        method: "get",
        url: `https://api.imgflip.com/get_memes`,
      });

      const dataMemes = getMemesData.data.data.memes;
      const dataMemeById = dataMemes.filter((dataMemes) => dataMemes.id == memeId);
      // console.log(dataMemeById);
      res.status(200).json(dataMemeById);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postGenerateMeme(req, res, next) {
    try {
      const { template_id, text0, text1, text2, text3, text4, text5 } = req.body;
      const USERNAME = process.env.API_USERNAME;
      const PASSWORD = process.env.API_PASSWORD;
      const arrText = [];

      if (text0) {
        arrText.push({ text: text0 });
      }
      if (text1) {
        arrText.push({ text: text1 });
      }
      if (text2) {
        arrText.push({ text: text2 });
      }
      if (text3) {
        arrText.push({ text: text3 });
      }
      if (text4) {
        arrText.push({ text: text4 });
      }
      if (text5) {
        arrText.push({ text: text5 });
      }

      const dataMeme = await axios({
        method: "post",
        url: `https://api.imgflip.com/caption_image`,
        params: {
          template_id,
          username: USERNAME,
          password: PASSWORD,
          boxes: arrText,
        },
      });

      const resultImage = dataMeme.data;
      console.log(resultImage);

      res.status(201).json(resultImage);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postMemeToDb(req, res, next) {
    try {
      const { title, imgUrl } = req.body;
      const postData = await Post.create({
        title,
        imgUrl,
        UserId: req.user.id,
      });

      res.status(201).json(postData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createMemeMulter(req, res, next) {
    try {
      const { path, filename, originalname } = req.file;

      const title = originalname.split(".")[0];
      console.log(title);

      var ImageKit = require("imagekit");
      const fs = require("fs");

      const imagekit = new ImageKit({
        publicKey: "public_2m9bUCMNIYAZyIAapS9WRlZ9S9E=",
        privateKey: "private_qhiULTWglJLPhg1MX7VwaMmhz+4=",
        urlEndpoint: "https://ik.imagekit.io/hamzahdiza",
      });

      const fileUploaded = fs.readFileSync(`./uploads/${filename}`);
      const result = await imagekit.upload({
        file: fileUploaded,
        fileName: filename,
      });

      const post = await Post.create({
        title,
        imgUrl: result.url,
        UserId: req.user.id,
      });

      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MemeController;
