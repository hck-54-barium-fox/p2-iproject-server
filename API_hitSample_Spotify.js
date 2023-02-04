const axios = require('axios');
require('dotenv').config()
let client_id = process.env.SPOTIFY_CLIENT_ID
let client_secret = process.env.SPOTIFY_CLIENT_SECRET


let token
let query = 'clear sky weather'.replaceAll(' ','%20')
async function getAuthToken() {
  try {
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
    token = data
    getFeatured()
  } catch (err) {
    console.log(err);
  }
}

async function getFeatured() {
  try {
    let {data} = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${query}&type=playlist`,
      headers: {
        Authorization: 'Bearer ' + token.access_token,
        "Content-Type": 'application/json'
      },
    })
    console.log('CURRENT WEATHER: ',query)
    console.log(data.playlists);
  } catch (err) {
    console.log(err);
  }
}

async function printToken() {
  await getAuthToken()
  console.log(token?.access_token)
}
// getFeatured()

printToken()



