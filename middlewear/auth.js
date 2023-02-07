const { User } = require("../models/index");
const { decodeToken } = require("../helpers/jwt");

async function authetication(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }

    let payload = decodeToken(access_token);
    let dataUser = await User.findByPk(payload.id);
    if (!dataUser) {
      throw { name: "Unauthorized" };
    }

    req.user = { id: dataUser.id, email:dataUser.email };
    next();
  } catch (error) {
    next(error);
  }
}




module.exports = { authetication };