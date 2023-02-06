const axios = require('axios');
require('dotenv').config();
let api_key = process.env.OPEN_WEATHER_API_KEY
let lat = '-6.266750'
let lon = '106.738586'

async function getCurrentWeather() {
  try {
    let {data} = await axios({
      method: 'get',
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`,
    })
    console.log(data)
  } catch (err) {
    console.log(err);
  }
}

getCurrentWeather()

