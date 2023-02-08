const axios = require("axios");
const { Card } = require("../models/index");

class ControllerCard {
  static async fetchCard(req, res, next) {
    try {
      let cardData = await Card.findAll({
        order: [['elixir', 'asc']]
      });
      if (cardData.length) {
        res.status(200).json(cardData);
      } else {
        let { data } = await axios({
          method: "get",
          url: "https://api.clashroyale.com/v1/cards",
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImEzZjFhOGMxLWUxMTAtNGZhZi1hMTE4LWRmOGI2YmVkYTc4NCIsImlhdCI6MTY3NTc4Nzg5Miwic3ViIjoiZGV2ZWxvcGVyL2M4Zjc0MGVkLTMzNmYtOTM0MC1iOGM1LWMyMmYwZWMyYzNlNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMzkuMjI4LjExMS4xMjUiLCIxODAuMjUyLjE2Ni41Il0sInR5cGUiOiJjbGllbnQifV19.4-G8yZmarredfPJYCFq2QZw_rJPrWe9xIL0qiBOGdcaaIRl1YUDhai8M00FIwYeWkMW-ZmDTV6W_W_lJeuWlRw",
          },
        });
        let dataCard = data.items.map((el) => {
          Card.create({
            name: el.name,
            iconUrl: el.iconUrls.medium,
          });
        });
        res.status(200).json(dataCard);
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerCard;
