const { decodeToken } = require("../helpers/jwt");
const { User, Card, Deck } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { status: 401, msg: "Please login first" };

    const dataToken = decodeToken(access_token);

    const user = await User.findByPk(dataToken.id);

    if (!user) throw { status: 401, msg: "Please login first" };
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
const authorization = async (req, res, next) => {
  try {
    let findCard = await Card.findByPk(+req.params.id);
    if (!findCard) throw { status: 404, msg: "Card not found" };

    let findDeck = await Deck.findAll({
      where: {
        CardId: req.params.id
      }
    })

    if (+req.user.id !== findDeck[0].UserId) {
      throw { status: 403, msg: "You are forbidden to perform this" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization, authentication };
