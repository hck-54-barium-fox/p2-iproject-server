const { compare } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      if (!email) {
        throw {
          name: "EmailRequired",
        };
      }
      if (!password) {
        throw {
          name: "PasswordRequired",
        };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw {
          name: "InvalidEmailPassword",
        };
      }
      const comparedPassword = compare(password, user.password);
      if (!comparedPassword) {
        throw {
          name: "InvalidEmailPassword",
        };
      }
      const token = sign({
        id: user.id,
        email: user.email,
      });
      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
