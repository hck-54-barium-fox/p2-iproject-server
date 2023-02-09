const axios = require("axios");
const { sign } = require("../helper/jwt");
const { hashPassword, compare } = require("../helper/bcryptjs");
const { User, News, MyNews } = require("../models");
let search = null;

class Controller {

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // console.log(req.body);
      if (!email) {
        throw { name: `Email is required` };
      }
      if (!password) {
        throw { name: `Password is required` };
      }
      const data = await User.findOne({ where: { email: email } });
      if (!data) {
        throw { name: `Invalid email/password` };
      }
      const isValid = compare(password, data.password);
      if (!isValid) {
        throw { name: `Invalid email/password` };
      }
      const payload = { id: data.id, email: data.email };
      const access_token = sign(payload);
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

}

module.exports = Controller;
