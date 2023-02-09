const { User } = require("../models/index");
const { comparePass } = require("../helpers/bcrypt");
const { encodeToken } = require("../helpers/jwt");
const { sendEmail } = require("../helpers/verifyAccount");

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
      await sendEmail(userRegisterData);
      res.status(201).json({ message: "Register Successfully", userRegisterData });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async verifyAccount(req, res) {
    try {
      const { token } = req.query;
      const data = await User.findOne({
        where: {
          verifyToken: token,
        },
      });
      data.verifyToken = null;
      data.status = true;
      await data.save();
      res.send({ message: "Your Email has been verified" });
    } catch (err) {
      res.json(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      let userLogin = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!userLogin) {
        // console.log("Masuk");
        throw { name: "invalid-login" };
      }

      if (userLogin.status == false) {
        throw { name: "notVerified" };
      }

      let compareResult = comparePass(password, userLogin.password);
      if (!compareResult) {
        throw { name: "invalid-login" };
      }

      // const { id } = userLogin;
      let access_token = encodeToken({
        id: userLogin.id,
      });

      res.status(200).json({
        access_token,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
