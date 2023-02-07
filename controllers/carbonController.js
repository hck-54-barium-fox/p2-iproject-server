const axios = require('axios')
const url = `https://beta3.api.climatiq.io/estimate`
const API_KEY = '5Q1HXJDH2R48F7HZYB4DQTYV70HJ' //env


class CarbonController {

    static async calculateTobbaco(req, res){
        try {
            let {price} = req.body

            let currencyMoney = (price/15000)
            console.log(currencyMoney)
            // console.log(typeof(currencyMoney) )
            const {data} = await axios({
                method : 'post',
                headers : {
                    Authorization: `Bearer ${API_KEY}`
                },
                url : url,
                data : {
                    "emission_factor": {
                        "activity_id": "consumer_goods-type_tobacco_products"
                    },
                    "parameters":
                        {
                        "money": currencyMoney, //money di currency dulu baru diinput
                        "money_unit": "usd"
                        }
                    }
            })
            console.log(data)
            console.log(data.co2e,data.co2e_unit, 'INI RESULT')
            // 7.259898240000001 kg INI RESULT display tampilannya terus unit di hardcode
            // res.send(data)
            res.status(200).json(data.co2e)
        } catch (error) {
            // errornya perlu di handle bagaimana
            console.log(error)
            res.send(error)
        }
    }

}

module.exports = CarbonController
// how to use axios?