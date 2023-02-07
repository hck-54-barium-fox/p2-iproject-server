const express = require('express')
const app = express()
const port = 1812

// const test =' http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=YOUR_API_KEY&steamids=${steamid}'

const steamid = '76561198192946697'

app.get('/itemdota', (req, res) => {
    const steamApiKey = 'FBDD4952A898BE1A214681A570F40B41';
    // const steamId = '76561198192946697';

    const endpoint = `https://api.steampowered.com/IEconDOTA2_570/GetGameItems/v1/?key=${steamApiKey}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const items = data.result.items;
            items.forEach(item => {
                console.log(item.name);
            });
        })
        .catch(error => {
            console.error(error);
        });

})




// app.get('/', (req, res) => {
//     const steamApiKey = '70ADC90E4953B0FBCB16F420D743AF68';
//     const itemName = 'YOUR_ITEM_NAME';

//     const endpoint = `https://api.steampowered.com/IEconDOTA2_570/GetMarketPrices/v1/?key=${steamApiKey}&item_name=${itemName}`;

//     fetch(endpoint)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data.result.prices[itemName]);
//         })
//         .catch(error => {
//             console.error(error);
//         });

// })


app.get('/', (req, res) => {
    const steamApiKey = '70ADC90E4953B0FBCB16F420D743AF68';

    const endpoint = `https://api.steampowered.com/ISteamEconomy/GetTradeableTypes/v1/?key=${steamApiKey}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const games = data.result.types;
            games.forEach(game => {
                console.log(game.name);
            });
        })
        .catch(error => {
            console.error(error);
        });

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})