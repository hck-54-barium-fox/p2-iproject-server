const {User} = require('../models');
const {OAuth2Client} = require('google-auth-library');
const {comparePassword, createToken} = require('../helpers/crypto');


class userController {

  // * Google login
  static async googleLogin(req, res, next) {
    try {
      const oAuth2Client = new OAuth2Client(process.env.GOOGLE_ID);
      const result = await oAuth2Client.verifyIdToken({
        idToken: req.body.idToken,
        expectedAudience: process.env.GOOGLE_ID,
      });

      const payload = await result.getPayload();

      let [created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: "customer-google-login",
          role: "user",
        },
        hooks: false,
      });

      let token = sign({
        id: created.id,
        username: created.username,
        email: created.email,
        role: created.role,
      });

      res.status(200).json({ access_token: token });

    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  // * User register
  static async register(req, res, next) {
    try {
      let {username, email, password} = req.body

      let createdUser = await User.create({
        username,
        email,
        password,
        role: 'user'
      })

      res.status(201).json({
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email
      })

    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  // * User login
  static async login(req, res, next) {
    try {
      let {email, password} = req.body
      if(!email) {
        throw {code: 400, msg: "Email is required"}
      }

      if(!password) {
        throw {code: 400, msg: "Password is required"}
      }

      let user = await User.findOne({where: {email}})

      if(!user) {
        throw {code: 401, msg: "Invalid email / password"}
      }

      let compared = comparePassword(password, user.password)

      if(!compared) {
        throw {code: 401, msg: "Invalid email / password"}
      }
      
      let token = createToken({
        id: user.id,
        email: user.email,
        role: user.role
      })
      
      res.status(200).json({access_token: token})

    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = userController