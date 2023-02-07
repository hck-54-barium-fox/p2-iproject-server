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
}

module.exports = MemeController;
