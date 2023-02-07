const axios = require("axios");

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
      const { template_id, title, text0, text1, text2, text3, text4, text5 } = req.body;
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
}

module.exports = MemeController;
