const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");


class mainController {

  //? Weather API
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

  //? OpenAI query suggestion
  static async generateAnswer() {
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `suggest one music search query for cloudy weather`,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 2,
        presence_penalty: 2,
      });
      console.log(response.data.choices[0].text)
    } catch (err) {
      console.log(err);
    }
  }

  //? Spotify API Sequence
  static async fetchPlaylist(req, res, next){
    try {
      let weather = req.body.weather
      let token = await mainController.getAuthToken()
      let data = await mainController.getPlaylist(token, weather)
      res.status(200).json(data)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async fetchTracks(req, res, next) {
    try {
      
      let url = req.body.url //? This url is obtained from fetch playlist
      let token = await mainController.getAuthToken()
      console.log(token, url, 'check this');
      let data = await mainController.getTracks(token, url)
      console.log(data, 'RESULT');
      res.status(200).json(data.items.slice(0,5).map(el => {
        let data = {
          track_artist: el.track.artists[0].name,
          track_name: el.track.name,
        }
        return data
      }))
    } catch (err) {
      console.log(err);
    }
  }

  static async getTracks(token, url) {
    try {
      let {data} = await axios({
        method: 'get',
        url: url,
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json'
        },
      })
      return data
    } catch (err) {
      console.log(err);
    }
  }

  // * GET OAUTH2 TOKEN
  static async getAuthToken() {
    try {
      let client_id = process.env.SPOTIFY_CLIENT_ID
      let client_secret = process.env.SPOTIFY_CLIENT_SECRET
      let {data} = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: {
          grant_type: 'client_credentials'
        },
      })
      let access_token = data.access_token
      return access_token
    } catch (err) {
      // TODO - How to pass this err to error handler
      console.log(err);
    }
  }

  // * GET PLAYLIST
  static async getPlaylist(token, query) {
    try {
      let normalized = query.replaceAll(' ','%20')
      let {data} = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/search?q=${normalized}&type=playlist`,
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json'
        },
      })
      console.log('CURRENT WEATHER: ', query)
      return data.playlists
    } catch (err) {
      // TODO - How to pass this err to error handler
      console.log(err);
    }
  }
}

module.exports = mainController