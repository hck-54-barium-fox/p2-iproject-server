const axios = require('axios');

class Controller {



    static async jadwalSholat(req, res){
        try {
            const {place} = req.params
            console.log(place);
            const {data} = await axios({
                method: 'get', 
                url: 'https://api.myquran.com/v1/sholat/jadwal/1609/2021/06/23', 

            })
            console.log(data, '<<<<<');
            res.status(200).json(data)
        } catch (err) {
            console.log(err, 'jadwal solat');
        }
    }

}


module.exports = Controller