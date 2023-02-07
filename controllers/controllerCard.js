const axios = require("axios");
const { Card } = require("../models/index");

class ControllerCard {
  static async fetchCard(req, res) {
    try {
      let cardData = await Card.findAll();
      if (cardData.length) {
        res.status(200).json(cardData);
      } else {
        let { data } = await axios({
          method: "get",
          url: "https://api.clashroyale.com/v1/cards",
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjYwOTU1ZTliLWJjODEtNGJkZS04ZjVhLWJlNjNlNDg0ODczOSIsImlhdCI6MTY3NTc0ODgxNywic3ViIjoiZGV2ZWxvcGVyL2M4Zjc0MGVkLTMzNmYtOTM0MC1iOGM1LWMyMmYwZWMyYzNlNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMzkuMjI4LjExMS4xMjUiXSwidHlwZSI6ImNsaWVudCJ9XX0.qS3J8iJClv8kYFwYr250lbNjTEvn77eQ5-eK9jSOig2nE8xshCQH_VzU2VJYS8tNu_DbZzPmoiCIaMgxJPDxzQ",
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
      console.log(error);
    }
  }
}

module.exports = ControllerCard;
