const { default: axios } = require("axios");
const { Card, Player } = require("../models/index");

class ControllerPlayer {
  static async getPlayerById(req, res, next) {
    try {
      let playerData = await Player.findOne({
        where: {
          tag: `#${req.params.tag}`,
        },
      });
      if (playerData) {
        res.status(200).json(playerData);
      } else {
        let { data } = await axios({
            method: 'get',
            url: `https://api.clashroyale.com/v1/players/%23${req.params.tag}`,
            headers: {
                Authorization:
                  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImEzZjFhOGMxLWUxMTAtNGZhZi1hMTE4LWRmOGI2YmVkYTc4NCIsImlhdCI6MTY3NTc4Nzg5Miwic3ViIjoiZGV2ZWxvcGVyL2M4Zjc0MGVkLTMzNmYtOTM0MC1iOGM1LWMyMmYwZWMyYzNlNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMzkuMjI4LjExMS4xMjUiLCIxODAuMjUyLjE2Ni41Il0sInR5cGUiOiJjbGllbnQifV19.4-G8yZmarredfPJYCFq2QZw_rJPrWe9xIL0qiBOGdcaaIRl1YUDhai8M00FIwYeWkMW-ZmDTV6W_W_lJeuWlRw",
              },
        })
        if (!data) throw ({status: 404, msg: 'Player not found'})
        let dataPlayer = await Player.create({
            tag: data.tag,
            name: data.name,
            level: data.expLevel,
            trophies: data.trophies,
            wins: data.wins,
            losses: data.losses,
            battlecount: data.battleCount
        })
        res.status(200).json(dataPlayer)
      }
    } catch (error) {
        next(error)
    }
  }
}

module.exports = ControllerPlayer;
