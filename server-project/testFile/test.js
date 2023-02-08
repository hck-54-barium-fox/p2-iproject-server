// const axios = require('axios');
// const steamApiKey = 'FACA7F60D7957979F199DAB0F28FBBB6';

// const endpoint = `https://api.steampowered.com/ISteamEconomy/GetTradeableTypes/v1/?key=${steamApiKey}`;

// axios.get(endpoint)
//   .then(response => {
//     const games = response.data.result.types;
//     games.forEach(game => {
//       console.log(game.name);
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });



const express = require('express')
const app = express()
const port = 1812

// const steamid = '76561198192946697'

// const steamApiKey = 'FBDD4952A898BE1A214681A570F40B41';

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

// // app.get('/', (req, res) => {
// //     const steamApiKey = '70ADC90E4953B0FBCB16F420D743AF68';
// //     const itemName = 'YOUR_ITEM_NAME';

// //     const endpoint = `https://api.steampowered.com/IEconDOTA2_570/GetMarketPrices/v1/?key=${steamApiKey}&item_name=${itemName}`;

// //     fetch(endpoint)
// //         .then(response => response.json())
// //         .then(data => {
// //             console.log(data.result.prices[itemName]);
// //         })
// //         .catch(error => {
// //             console.error(error);
// //         });

// // })

const axios = require("axios");

app.get('/', async (req, res) => {
  const steamApiKey = '70ADC90E4953B0FBCB16F420D743AF68';

//   const endpoint = `https://api.steampowered.com/ISteamEconomy/GetTradeableTypes/v1/?key=${steamApiKey}`;

    try {
      const response = await axios.get(`https://api.steampowered.com/IEconDOTA2_570/GetGameItems/v1/?key=${steamApiKey}`);
      const items = response.data.result.items;
       items.map((item) => ({
        name: item.name,
        image: `http://cdn.dota2.com/apps/dota2/images/items/${item.name.replace(/ /g, "_")}_lg.png`,
      }));
      res.status(200).json(items)
      
    } catch (error) {
      console.error(error);
    }
  
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
