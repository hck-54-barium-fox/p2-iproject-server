const { decodeToken } = require("../helpers/jwt");
const { User, Post, Like } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    // console.log(access_token);

    if (!access_token) {
      throw { name: "invalid-token" };
    }

    const data = decodeToken(access_token);
    // console.log(data);

    const user = await User.findByPk(data.id);
    // console.log(user);

    if (!user) {
      throw { name: "invalid-token" };
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { authentication };
