const { User, Transaction } = require("../models/index");
const { decodeToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }

    let payload = decodeToken(access_token);
    console.log(payload);
    let dataUser = await User.findByPk(payload);
    if (!dataUser) {
      console.log('masuk sini');
      throw { name: "Unauthorized" };
    }

    req.user = { id: dataUser.id, email:dataUser.email };
    next();
  } catch (error) {
    next(error);
  }
}


async function authorization(req, res, next) {
  try {
    let id = req.params.id;
    let transaction = await Transaction.findByPk(id);

    if (!transaction) {
      throw { name: "NotFound" };
    }

    let transUser = transaction.UserId;
    let userId = req.user.id;

    if (transUser !== userId) {
      throw { name: "Forbidden" };
    }

    next();
  } catch (error) {
    next(error);
  }
}






module.exports = { authentication, authorization };