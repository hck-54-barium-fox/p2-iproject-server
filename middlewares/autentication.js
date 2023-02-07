const { verify } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
        name: "InvalidToken",
      };
    }
    const verifiedToken = verify(access_token);
    const user = await User.findByPk(verifiedToken.id);
    if (!user) {
      throw {
        name: "InvalidToken",
      };
    }
    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentication;
