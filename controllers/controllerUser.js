
const { default: axios } = require("axios");
const { compare } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");
const { User, Player } = require("../models/index");

class ControllerUser {
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
      if (!email) throw ({status: 400, msg: 'Email is required'})
      if (!password) throw ({status: 400, msg: 'Password is required'})
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
        .json({ access_token, id: user.id, username: user.email });
    } catch (err) {
      next(err);
    }
  }
  static async postLoginCR(req, res, next) {
    try {
      let player;
      let findPlayer = await Player.findOne({
        where: {
          tag: `#${req.body.Id}`,
        },
      });
      if (!findPlayer) {
        let { data } = await axios({
          method: "get",
          url: `https://api.clashroyale.com/v1/players/%23${req.body.Id}`,
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImEzZjFhOGMxLWUxMTAtNGZhZi1hMTE4LWRmOGI2YmVkYTc4NCIsImlhdCI6MTY3NTc4Nzg5Miwic3ViIjoiZGV2ZWxvcGVyL2M4Zjc0MGVkLTMzNmYtOTM0MC1iOGM1LWMyMmYwZWMyYzNlNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMzkuMjI4LjExMS4xMjUiLCIxODAuMjUyLjE2Ni41Il0sInR5cGUiOiJjbGllbnQifV19.4-G8yZmarredfPJYCFq2QZw_rJPrWe9xIL0qiBOGdcaaIRl1YUDhai8M00FIwYeWkMW-ZmDTV6W_W_lJeuWlRw",
          },
        });
        let dataPlayer = await Player.create({
          tag: data.tag,
          name: data.name,
          level: data.expLevel,
          trophies: data.trophies,
          wins: data.wins,
          losses: data.losses,
          battlecount: data.battleCount,
        });
      } 
        let findUser = await User.findOne({
          where: {
            email: `${findPlayer.name}@mail.com`
          }
        })
        if (!findUser) {
          let user = await User.create({
            email: `${findPlayer.name}@mail.com`,
            password: findPlayer.tag
          })
          let access_token = createToken({ id: user.id, email: user.email });
        res
          .status(200)
          .json({ access_token, id: user.id, username: user.email });
        } else {
          let access_token = createToken({id: findUser.id, email: findUser.email})
          res
          .status(200)
          .json({ access_token, id: findUser.id, email: findUser.email });
        }

      
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = ControllerUser;
