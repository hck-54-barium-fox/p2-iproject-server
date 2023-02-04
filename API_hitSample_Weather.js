const axios = require('axios');
let api_key = 'c1cdb284fb2dbce8e9eb0b608ce8119e'
let lat = '35.6762'
let lon = '139.6503'

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

