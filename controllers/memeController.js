const axios = require("axios");

class MemeController {
  static async getAllMemes(req, res, next) {
    try {
      const memes = await axios({
        method: "get",
        url: `https://api.imgflip.com/get_memes`,
      });

      const memesData = memes.data.data.memes;

      res.status(200).json(memesData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = MemeController;
