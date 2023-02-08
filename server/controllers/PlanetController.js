const axios = require("axios");
class PlanetController{
    static async readPlanets(req,res){
        try {
            let {data} = await axios({
                method:'get',
                url:'https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planet/list',
                headers: {
                    'X-RapidAPI-Key': '0e0c5bb78amshed1b6b5d96fd136p1de1c2jsn583fcac5966d',
                    'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
                  }
            })
            data = data.map(el=>{
                return {
                    id:el.id,
                    name : el.name,
                    description : el.description,
                    img:{
                        imgUrl:el.imgSrc[0].img,
                        imgDescription:el.imgSrc[0].imgDescription
                    },
                    keyId:el.key
                }
            })
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async readPlanetById(req,res){
        try {
            let keyId = req.params.id
            let {data} = await axios({
                method:'GET',
                url:`https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planet/${keyId}`,
                headers: {
                    'X-RapidAPI-Key': '0e0c5bb78amshed1b6b5d96fd136p1de1c2jsn583fcac5966d',
                    'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
                  }
            })
            data = data.map(el=>{
                return {
                    id:el.id,
                    name : el.name,
                    description : el.description,
                    img:{
                        imgUrl:el.imgSrc[0].img,
                        imgDescription:el.imgSrc[0].imgDescription
                    },
                    keyId:el.key
                }
            })
            res.status(200).json(data)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
    static async getAPOD(req,res){
        try {
            let {data} = await axios({
                method:'get',
                url:`https://api.nasa.gov/planetary/apod?api_key=6SAoXGV3AwKg7FSQjPHVUsJBcjtqDFbxeAXX3GY9`
            })
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = PlanetController