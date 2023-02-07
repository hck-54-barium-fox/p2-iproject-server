const { default: axios } = require("axios");
const { Card, Player } = require("../models/index");

class ControllerPlayer {
  static async getPlayerById(req, res) {
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
                  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjYwOTU1ZTliLWJjODEtNGJkZS04ZjVhLWJlNjNlNDg0ODczOSIsImlhdCI6MTY3NTc0ODgxNywic3ViIjoiZGV2ZWxvcGVyL2M4Zjc0MGVkLTMzNmYtOTM0MC1iOGM1LWMyMmYwZWMyYzNlNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMzkuMjI4LjExMS4xMjUiXSwidHlwZSI6ImNsaWVudCJ9XX0.qS3J8iJClv8kYFwYr250lbNjTEvn77eQ5-eK9jSOig2nE8xshCQH_VzU2VJYS8tNu_DbZzPmoiCIaMgxJPDxzQ",
              },
        })
        if (!data) throw ({code: 404, msg: 'Player not found'})
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
        if (error.code) {
            res.status(error.code).json({message: error.msg})
        } else {
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    }
  }
}

module.exports = ControllerPlayer;
