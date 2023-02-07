const axios = require("axios");

class weaponController{

    static readWeapon (req, res, next){
        const options = {
            method: 'GET',
            url: 'https://valorant-agents-maps-arsenal.p.rapidapi.com/arsenal/en-us',
            params: { category: 'rifles' },
            headers: {
                'X-RapidAPI-Key': '38a9d5e8acmsh52f1d03867e8dbdp1b9f55jsn580cb41faaa9',
                'X-RapidAPI-Host': 'valorant-agents-maps-arsenal.p.rapidapi.com'
            }
        };
    
        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

}

module.exports = weaponController