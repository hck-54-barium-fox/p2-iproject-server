const axios = require("axios");
const calculateTime = require("../helpers/calculateTime");
const url = process.env.CLIMATE_API
const API_KEY = process.env.CLIMATE_API_KEY //env

// console.log(url)
// console.log(API_KEY)
class CarbonController {
  static async calculateTobbaco(req, res) {
    try {

      // console.log(req.body, 'INI REQ BODY')
      let { price } = req.body;
      console.log(price, 'ini PRICENYA')
      let currencyMoney = +price / 15000;
      const { data } = await axios({
        method: "post",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        url: url,
        data: {
          emission_factor: {
            activity_id: "consumer_goods-type_tobacco_products",
          },
          parameters: {
            money: +currencyMoney, //money di currency dulu baru diinput
            money_unit: "usd",
          },
        },
      });
      // console.log(data)
      //   console.log(data.co2e, data.co2e_unit, "INI RESULT");
      let co2 = data.co2e;
      let time = calculateTime(co2);

      res.status(200).json({ co2: co2, time: time });
    } catch (error) {
      // errornya perlu di handle bagaimana
      // console.log(error);
      res.send(error);
    }
  }

  static async calculateEmission(req, res) {
    try {
      let { distance } = req.body;
      console.log(distance);
      console.log(typeof distance, "TYPE OF");

      const { data } = await axios({
        method: "post",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        url: url,
        data: {
          emission_factor: {
            activity_id:
              "passenger_vehicle-vehicle_type_motorcycle-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na",
          },
          parameters: {
            distance: +distance,
            distance_unit: "km",
          },
        },
      });
      let co2 = data.co2e;
      let time = calculateTime(co2);

      //   console.log(time, "INI ESTIMATE TIMENYA");

      res.status(200).json({ co2: co2, time: time });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = CarbonController;
// how to use axios?
