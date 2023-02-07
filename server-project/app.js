const express = require('express')
const app = express()
const port = 1812

const steamid = '76561198192946697'

const steamApiKey = 'FBDD4952A898BE1A214681A570F40B41';

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

app.get('/game', (req, res) => {
    // const steamId = '76561198192946697';
    const appId = [
        {
            "appid": 1748523,
            "name": "Starry Moon Island Cannon War MP04"
        },
        {
            "appid": 1748524,
            "name": "Starry Moon Island Cannon War MP05"
        },
        {
            "appid": 1748525,
            "name": "Starry Moon Island Cannon War MP06"
        },
        {
            "appid": 1748526,
            "name": "Starry Moon Island Cannon War MP07"
        },
        {
            "appid": 1748527,
            "name": "Starry Moon Island Cannon War MP08"
        },
        {
            "appid": 1748528,
            "name": "Starry Moon Island Cannon War MP09"
        },
        {
            "appid": 1748529,
            "name": "Starry Moon Island Cannon War MP10"
        },
        {
            "appid": 1748530,
            "name": "Starry Moon Island Perimeter MP01"
        },
        {
            "appid": 1748531,
            "name": "Starry Moon Island Perimeter MP02"
        },
        {
            "appid": 1748532,
            "name": "Starry Moon Island Perimeter MP03"
        },
        {
            "appid": 1748533,
            "name": "Starry Moon Island Perimeter MP04"
        },
        {
            "appid": 1748534,
            "name": "Starry Moon Island Perimeter MP05"
        },
        {
            "appid": 1748535,
            "name": "Starry Moon Island Perimeter MP06"
        },
        {
            "appid": 1748536,
            "name": "Starry Moon Island Perimeter MP07"
        },
        {
            "appid": 1748537,
            "name": "Starry Moon Island Perimeter MP08"
        },
        {
            "appid": 1748538,
            "name": "Starry Moon Island Perimeter MP09"
        },
        {
            "appid": 1748539,
            "name": "Starry Moon Island Perimeter MP10"
        },
        {
            "appid": 1748540,
            "name": "Starry Moon Island DNA War MP01"
        },
        {
            "appid": 1748541,
            "name": "Starry Moon Island DNA War MP02"
        },
        {
            "appid": 1748542,
            "name": "Starry Moon Island DNA War MP03"
        },
        {
            "appid": 1748543,
            "name": "Starry Moon Island DNA War MP04"
        },
        {
            "appid": 1748544,
            "name": "Starry Moon Island DNA War MP05"
        },
        {
            "appid": 1748545,
            "name": "Starry Moon Island DNA War MP06"
        },
        {
            "appid": 1748546,
            "name": "Starry Moon Island DNA War MP07"
        },
        {
            "appid": 1748547,
            "name": "Starry Moon Island DNA War MP08"
        },
        {
            "appid": 1748548,
            "name": "Starry Moon Island DNA War MP09"
        },
        {
            "appid": 1748549,
            "name": "Starry Moon Island DNA War MP10"
        },
        {
            "appid": 1748550,
            "name": "Starry Moon Island Tank Advance MP01"
        },
        {
            "appid": 1748551,
            "name": "Starry Moon Island Tank Advance MP02"
        },
        {
            "appid": 1748552,
            "name": "Starry Moon Island Tank Advance MP03"
        },
        {
            "appid": 1748553,
            "name": "Starry Moon Island Tank Advance MP04"
        },
        {
            "appid": 1748554,
            "name": "Starry Moon Island Tank Advance MP05"
        },
        {
            "appid": 1748555,
            "name": "Starry Moon Island Tank Advance MP06"
        },
        {
            "appid": 1748556,
            "name": "Starry Moon Island Tank Advance MP07"
        },
        {
            "appid": 1748557,
            "name": "Starry Moon Island Tank Advance MP08"
        },
        {
            "appid": 1748558,
            "name": "Starry Moon Island Tank Advance MP09"
        },
        {
            "appid": 1748559,
            "name": "Starry Moon Island Tank Advance MP10"
        },
        {
            "appid": 1748560,
            "name": "Starry Moon Island Cannonade MP01"
        },
        {
            "appid": 1748561,
            "name": "Starry Moon Island Cannonade MP02"
        },
        {
            "appid": 1748562,
            "name": "Starry Moon Island Cannonade MP03"
        },
        {
            "appid": 1748563,
            "name": "Starry Moon Island Cannonade MP04"
        },
        {
            "appid": 1748564,
            "name": "Starry Moon Island Cannonade MP05"
        },
        {
            "appid": 1748565,
            "name": "Starry Moon Island Cannonade MP06"
        },
        {
            "appid": 1748566,
            "name": "Starry Moon Island Cannonade MP07"
        },
        {
            "appid": 1748567,
            "name": "Starry Moon Island Cannonade MP08"
        },
        {
            "appid": 1748568,
            "name": "Starry Moon Island Cannonade MP09"
        },
        {
            "appid": 1748569,
            "name": "Starry Moon Island Cannonade MP10"
        },
        {
            "appid": 1748570,
            "name": "Hexmet World"
        },
        {
            "appid": 1748446,
            "name": "Starry Moon Island Out Of Control MP07"
        },
        {
            "appid": 1748447,
            "name": "Starry Moon Island Out Of Control MP08"
        },
        {
            "appid": 1748448,
            "name": "Starry Moon Island Out Of Control MP09"
        },
        {
            "appid": 1748449,
            "name": "Starry Moon Island Out Of Control MP10"
        },
        {
            "appid": 1748450,
            "name": "Sword of Hypotenuse Soundtrack"
        },
        {
            "appid": 1748460,
            "name": "Starry Moon Island Red Snake MP01"
        },
        {
            "appid": 1748461,
            "name": "Starry Moon Island Red Snake MP02"
        },
        {
            "appid": 1748462,
            "name": "Starry Moon Island Red Snake MP03"
        },
        {
            "appid": 1748463,
            "name": "Starry Moon Island Red Snake MP04"
        },
        {
            "appid": 1748464,
            "name": "Starry Moon Island Red Snake MP05"
        },
        {
            "appid": 1748465,
            "name": "Starry Moon Island Red Snake MP06"
        },
        {
            "appid": 1748466,
            "name": "Starry Moon Island Red Snake MP07"
        },
        {
            "appid": 1748467,
            "name": "Starry Moon Island Red Snake MP08"
        },
        {
            "appid": 1748468,
            "name": "Starry Moon Island Red Snake MP09"
        },
        {
            "appid": 1748469,
            "name": "Starry Moon Island Red Snake MP10"
        },
        {
            "appid": 1748470,
            "name": "Starry Moon Island Star Ocean MP01"
        },
        {
            "appid": 1748471,
            "name": "Starry Moon Island Star Ocean MP02"
        },
        {
            "appid": 1748472,
            "name": "Starry Moon Island Star Ocean MP03"
        },
        {
            "appid": 1748473,
            "name": "Starry Moon Island Star Ocean MP04"
        },
        {
            "appid": 1748474,
            "name": "Starry Moon Island Star Ocean MP05"
        },
        {
            "appid": 1748475,
            "name": "Starry Moon Island Star Ocean MP06"
        },
        {
            "appid": 1748476,
            "name": "Starry Moon Island Star Ocean MP07"
        },
        {
            "appid": 1748477,
            "name": "Starry Moon Island Star Ocean MP08"
        },
        {
            "appid": 1748478,
            "name": "Starry Moon Island Star Ocean MP09"
        },
        {
            "appid": 1748479,
            "name": "Starry Moon Island Star Ocean MP10"
        },
        {
            "appid": 1748480,
            "name": "Starry Moon Island Break Out MP01"
        },
        {
            "appid": 1748481,
            "name": "Starry Moon Island Break Out MP02"
        },
        {
            "appid": 1748482,
            "name": "Starry Moon Island Break Out MP03"
        },
        {
            "appid": 1748483,
            "name": "Starry Moon Island Break Out MP04"
        },
        {
            "appid": 1748484,
            "name": "Starry Moon Island Break Out MP05"
        },
        {
            "appid": 1748485,
            "name": "Starry Moon Island Break Out MP06"
        },
        {
            "appid": 1748486,
            "name": "Starry Moon Island Break Out MP07"
        },
        {
            "appid": 1748487,
            "name": "Starry Moon Island Break Out MP08"
        },
        {
            "appid": 1748488,
            "name": "Starry Moon Island Break Out MP09"
        },
        {
            "appid": 1748489,
            "name": "Starry Moon Island Break Out MP10"
        },
        {
            "appid": 1748490,
            "name": "Jackpot Bennaction - B03 : Discover The Mystery Combination"
        },
        {
            "appid": 1748500,
            "name": "Starry Moon Island Mobile Stronghold MP01"
        },
        {
            "appid": 1748501,
            "name": "Starry Moon Island Mobile Stronghold MP02"
        },
        {
            "appid": 1748502,
            "name": "Starry Moon Island Mobile Stronghold MP03"
        },
        {
            "appid": 1748503,
            "name": "Starry Moon Island Mobile Stronghold MP04"
        },
        {
            "appid": 1748504,
            "name": "Starry Moon Island Mobile Stronghold MP05"
        },
        {
            "appid": 1748505,
            "name": "Starry Moon Island Mobile Stronghold MP06"
        },
        {
            "appid": 1748506,
            "name": "Starry Moon Island Mobile Stronghold MP07"
        },
        {
            "appid": 1748507,
            "name": "Starry Moon Island Mobile Stronghold MP08"
        },
        {
            "appid": 1748508,
            "name": "Starry Moon Island Mobile Stronghold MP09"
        },
        {
            "appid": 1748509,
            "name": "Starry Moon Island Mobile Stronghold MP10"
        },
        {
            "appid": 1748520,
            "name": "Starry Moon Island Cannon War MP01"
        },
        {
            "appid": 1748521,
            "name": "Starry Moon Island Cannon War MP02"
        },
        {
            "appid": 1748522,
            "name": "Starry Moon Island Cannon War MP03"
        },
        {
            "appid": 1748020,
            "name": "Kusari Kingdom"
        },
        {
            "appid": 1748030,
            "name": "Dextram Demo"
        },
        {
            "appid": 1748050,
            "name": "A Sinful Camp"
        },
        {
            "appid": 1748060,
            "name": "Starcross Starcade Special"
        },
        {
            "appid": 1748070,
            "name": "Storage Chase"
        },
        {
            "appid": 1748090,
            "name": "Juicy Bois: Fashion & Conflict"
        },
        {
            "appid": 1748100,
            "name": "Freedom Farming - The American Way"
        },
        {
            "appid": 1748170,
            "name": "Fiasco Restoration and Repair"
        },
        {
            "appid": 1748210,
            "name": "Lovely Animal Stories"
        },
        {
            "appid": 1748220,
            "name": "Rocklen Playtest"
        },
        {
            "appid": 1748230,
            "name": "RESTLESS SOUL"
        },
        {
            "appid": 1748240,
            "name": "Rectitude"
        },
        {
            "appid": 1748250,
            "name": "Only Evil Remains"
        },
        {
            "appid": 1748260,
            "name": "Circuit City"
        },
        {
            "appid": 1748290,
            "name": "Hardcore Cruising: A Sci-Fi Gay Sex Cruise!"
        },
        {
            "appid": 1748310,
            "name": "Octofight Escape"
        },
        {
            "appid": 1748330,
            "name": "Sand: A Superfluous Game"
        },
        {
            "appid": 1748340,
            "name": "Finding Home"
        },
        {
            "appid": 1748370,
            "name": "The Hunt"
        },
        {
            "appid": 1748380,
            "name": "Our Brotherly War"
        },
        {
            "appid": 1748400,
            "name": "Starry Moon Island"
        },
        {
            "appid": 1748410,
            "name": " MONSTER HUNTER RISE - Pre-order bonus Add-on Content"
        },
        {
            "appid": 1748440,
            "name": "Starry Moon Island Out Of Control MP01"
        },
        {
            "appid": 1748441,
            "name": "Starry Moon Island Out Of Control MP02"
        },
        {
            "appid": 1748442,
            "name": "Starry Moon Island Out Of Control MP03"
        },
    ]
    const dataGame = []
    // appId.forEach(el => {
        // console.log(el.appid);
        const endpoint = `https://store.steampowered.com/api/appdetails?appids=10`;
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
            
                console.log(data["10"].data);
                // dataGame = data
                
                res.status(200).json( data['10'].data)
            })
            .catch(error => {
                console.error(error);
            });
        // })
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})