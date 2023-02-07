const { User } = require("../models/index");
const { comparePass } = require("../helpers/bcrypt");
const { encodeToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    // res.status(201).json("Berhasil");
    try {
      const { username, email, password } = req.body;
      console.log(req.body);
      let userRegisterData = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({ message: "Register Successfully", userRegisterData });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
