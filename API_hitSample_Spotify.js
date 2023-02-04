const axios = require('axios');
let client_id = '278fd491722742bd9364bfe1a093ae2a'
let client_secret = '682251e32d6443b98f3f12184425bda5'


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



