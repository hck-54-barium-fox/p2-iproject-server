const movieQuote = require("popular-movie-quotes");

class QuoteController {
  static async getRandomQuote(req, res, next) {
    try {
      const data = movieQuote.getSomeRandom(3); 
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = QuoteController;
