const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const username = payload.given_name;
      const email = payload.email;

      const [row, created] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          username,
          email,
          password: "indra",
          membership: "regular",
        },
      });
      let access_token;
      if (row) {
        access_token = signToken({
          email: row.email,
          id: row.id,
        });
        res.status(200).json({
          access_token,
          username: row.dataValues.username,
          role: row.dataValues.role,
        });
      } else {
        access_token = signToken({
          email: created.email,
          id: created.id,
        });
        res.status(200).json({
          access_token,
          username: created.dataValues.username,
          role: row.dataValues.role,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
