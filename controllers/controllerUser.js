const { compare } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class ControllerUser{
    static async postRegister(req, res, next) {
        try {
          const { email, password } = req.body;
          let user = await User.create({
            email,
            password,
          });
          res.status(201).json({ user });
        } catch (err) {
          next(err);
        }
      }
      static async postLogin(req, res, next) {
        try {
          const { email, password } = req.body;
          if (!email) throw ({status: 400, msg: 'Please insert email'})
          if (!password) throw ({status: 400, msg: 'Please insert password'})
          let user = await User.findOne({ where: { email } });
          if (!user)
            throw {
              status: 401,
              msg: "Error invalid email or password",
            };
    
          let isValidPassword = compare(password, user.password);
          if (!isValidPassword)
            throw {
              status: 401,
              msg: "Error invalid email or password",
            };
    
          let access_token = createToken({ id: user.id, email: user.email });
          res
            .status(200)
            .json({ access_token, userId: user.id, userEmail: user.email });
        } catch (err) {
          next(err);
        }
      }
}

module.exports = ControllerUser