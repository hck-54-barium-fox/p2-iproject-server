const express = require('express')
const cors = require('cors')
// const fetch = require('node-fetch')
const { User, Landmark, Bookmark } = require('./models/index')

const app = express()
const port = 8000

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.get('/landmarks', async (req, res, next) => {
    try {
        const LandmarkData = await Landmark.findAll()

        res.status(200).json({result: LandmarkData})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

app.post('/landmarks', async (req, res, next) =>{
    const { latitude, longitude, imageUrl, content } = req.body

    try {
        const coordinateExist = Landmark.findOne({
            where: {
                latitude: latitude,
                longitude: longitude
            }
        })

        if(!coordinateExist){
            const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=2d78eafc72cd4a64b0f13609fc011cd1`)
            const additionalData = await response.json()
        
            const landmarkName = additionalData.results[0].name
            const landmarkCountry = additionalData.results[0].country

            if(landmarkName){
                const { data } = await Landmark.create({
                    latitude: latitude,
                    longitude: longitude,
                    name: landmarkName,
                    country: landmarkCountry,
                    imageUrl: imageUrl,
                    content: content
                })
        
                res.status(201).json({message: `Successfully create mark for landmark ${data.name}`})
            } else {
                res.status(400).json({message: "No valid name found for this location"})
            }
            
        } else {
            res.status(400).json({message: "Location already exist in database"})
        }
    } catch (error) {
        if(error.name === 'SequelizeValidationError'){
            let errVal = error.errors.map(el => {return el.message})

            res.status(400).json({message: errVal[0]})
        } else {
            res.status(500).json({message: "Internal server error"})
        }
    }
    
})

app.get('/bookmarks', async (req, res, next) => {
    try {
        const BookmarkData = await Bookmark.findAll()

        res.status(200).json({result: BookmarkData})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

app.listen(port, () => {
    console.log('Listening to port:', port);
})