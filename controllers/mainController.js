const axios = require('axios');


class mainController {
  static async getWeather(req, res, next) {
    try {
      let api_key = process.env.OPEN_WEATHER_API_KEY
      let {latitude, longitude} = req.body

      if (!latitude || !longitude) {
        throw {code: 400, msg: "Coordinates are required"}
      }

      let {data} = await axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`,
      })
      console.log(data);
      res.status(200).json({
        nearest_station: data.name,
        weather: data.weather
      })

    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = mainController