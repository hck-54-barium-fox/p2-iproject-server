const movieQuote = require("popular-movie-quotes");

class QuoteController {
  static async getRandomQuote(req, res, next) {
    try {
      res.status(200).
        json({
          message: movieQuote.getRandomQuote(),
        });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = QuoteController;
