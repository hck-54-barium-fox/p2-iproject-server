const axios = require('axios');
const steamApiKey = 'FACA7F60D7957979F199DAB0F28FBBB6';

const endpoint = `https://api.steampowered.com/ISteamEconomy/GetTradeableTypes/v1/?key=${steamApiKey}`;

axios.get(endpoint)
  .then(response => {
    const games = response.data.result.types;
    games.forEach(game => {
      console.log(game.name);
    });
  })
  .catch(error => {
    console.error(error);
  });
