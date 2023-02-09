const axios = require("axios");
class PlanetController{
    static async readPlanets(req,res){
        try {
            let {data} = await axios({
                method:'get',
                url:'https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planet/list',
                headers: {
                    'X-RapidAPI-Key': process.env.RAPID_KEY,
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
            res.status(500).json({message:"Internal server error"})
        }
    }
    static async readPlanetById(req,res){
        try {
            let keyId = req.params.id
            let {data} = await axios({
                method:'GET',
                url:`https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planet/${keyId}`,
                headers: {
                    'X-RapidAPI-Key': process.env.RAPID_KEY,
                    'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
                  }
            })
            let detailPlanet = {
                id:data.id,
                name : data.name,
                description : data.description,
                img:{
                    imgUrl:data.imgSrc[0].img,
                    imgDescription:data.imgSrc[0].imgDescription
                },
                keyId:data.key
            }
            res.status(200).json(detailPlanet)
        } catch (err) {
            res.status(500).json({message:"Internal server error"})
        }
    }
    static async getAPOD(req,res){
        try {
            let {data} = await axios({
                method:'get',
                url:`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`
            })
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json({message:"Internal server error"})
        }
    }
}

module.exports = PlanetController