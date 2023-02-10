if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const cors = require('cors')
const { OAuth2Client } = require('google-auth-library')

const { User, Landmark, Bookmark } = require('./models/index')
const { compareHash, signToken } = require('./helpers');
const { authentication, adminAuthorization, authorization } = require('./middlewares/auth');
const upload = require('./middlewares/multer');

const client = new OAuth2Client(process.env.GOOGLE_ID)
const app = express()
const port = process.env.PORT || 8000

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

app.post('/register', async (req, res, next) => {
    const { email, username, password } = req.body
    
    try {
        const registerUser = await User.create({
            email: email,
            username: username,
            password: password
        })

        const token = signToken({
            id: registerUser.id,
            email: registerUser.email
        })

        res.status(201).json({message: `User successfully registered. Welcome aboard, ${registerUser.username}!`, userData: {token: token, role: registerUser.role}})
    } catch (error) {
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
            let errVal = error.errors.map(el => {return el.message})
    
            if(errVal.length > 1){
                errVal = errVal[0]
            }
    
            res.status(400).json({message: errVal})
        } else {
            res.status(500).json({message: "Internal server error"})
        }
    }
})

app.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    try {
        const userData = await User.findOne({
            where: {
                email: email
            }
        })
    
        if(userData){
            const validity = compareHash(password, userData.password)

            if(validity){
                const token = signToken({
                    id: userData.id,
                    email: userData.email
                })

                res.status(200).json({message: `Successfully logged in as ${userData.username}`, userData: {token: token, role: userData.role}})
            } else {
                res.status(401).json({message: "Invalid email/password"})
            }
        } else {
            res.status(401).json({message: "Invalid email/password"})
        }
    } catch (error) {
        if(error.name === 'SequelizeValidationError'){
            let errVal = error.errors.map(el => {return el.message})
    
            if(errVal.length > 1){
                errVal = errVal[0]
            }
    
            res.status(400).json({message: errVal})
        } else {
            res.status(500).json({message: "Internal server error"})
        }
    }
})

app.post('/google-login', async (req, res, next) => {
    let token = req.headers.token
    let ticket

    try {
        const verificationResult = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_ID
        })

        if(verificationResult){
            ticket = verificationResult

            let payload = ticket.getPayload()

            let userData = await User.findOne({
                where: {
                    email: payload.email,
                    username: payload.name
                }
            })

            if(!userData){
                userData = await User.create({
                    email: payload.email,
                    username: payload.name,
                    password: payload.sub
                })
                
                const token = signToken({
                    id: userData.id,
                    email: userData.email
                })

                res.status(201).json({message: 'User successfully registered', data: {id: userData.id, username: userData.username, email: userData.email, role: userData.role}, token: token})
            } else {
                const token = signToken({
                    id: userData.id,
                    email: userData.email
                })

                res.status(200).json({message: `Successfully logged in as ${userData.username}`, data: {id: userData.id, username: userData.username, email: userData.email, role: userData.role}, token: token})
            }
        } else {
            res.status(500).json({message: "Internal server error"})
        }
    } catch (error) {
        if(error.name === 'SequelizeValidationError'){
            let errVal = error.errors.map(el => {return el.message})
    
            if(errVal.length > 1){
                errVal = errVal[0]
            }
    
            res.status(400).json({message: errVal})
        } else {
            res.status(500).json({message: "Internal server error"})
        }
    }
})

app.get('/weather', async (req, res, next) => {
    const { latitude, longitude } = req.query
    let thisWeekData = []
    // console.log(req);

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&models=best_match&daily=weathercode,temperature_2m_max&timezone=auto&past_days=7`)
        const weatherData = await response.json()

        const dates = weatherData.daily.time.slice(6, 13).map(el => {
            let date = new Date(el)
            el = date.toLocaleDateString('en-US', {weekday: 'long'}).slice(0, 3)

            return el
        })
        const weatherCodes = weatherData.daily.weathercode.slice(6, 13)
        const temperature = weatherData.daily.temperature_2m_max.slice(6, 13)
        
        for(let i in dates){
            thisWeekData.push({
                id: +i+1,
                day: dates[i],
                weather: weatherCodes[i],
                temperature: temperature[i]
            })
        }

        res.status(200).json({thisWeek: thisWeekData})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

app.get('/landmarks', async (req, res, next) => {
    try {
        const landmarkData = await Landmark.findAll()

        res.status(200).json({result: landmarkData})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

app.get('/landmarks/:id', async (req, res, next) => {
    const landmarkId = req.params.id
    
    try {
        const landmarkData = await Landmark.findByPk(landmarkId)

        if(landmarkData){
            res.status(200).json({data: landmarkData})
        } else {
            res.status(404).json({message: `Landmark with ID ${landmarkId} is not found`})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

app.use(authentication)

app.post('/landmarkImg', upload.single("landmarkImg"), async (req, res, next) => {
    const { path, filename, originalname } = req.file
    
    const ImageKit = require('imagekit')
    const fs = require('fs')

    const newImageKit = new ImageKit({
        publicKey: "public_tkxJwCXrkyFHhvlENALIDlWIj/E=",
        privateKey: "private_oHvGQM+6m58RveMOecFHnbTvZck=",
        urlEndpoint: "https://ik.imagekit.io/ikaPFW"
    })

    const imageFile = fs.readFileSync(`./public/uploads/${filename}`)
    const fileUpload = await newImageKit.upload({
        fileName: filename,
        file: imageFile
    })

    try {
        res.status(201).json({imgPath: fileUpload.url})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

app.post('/landmarks', adminAuthorization, async (req, res, next) =>{
    const { latitude, longitude, imageUrl, content } = req.body
    console.log(req.body);

    try {
        const coordinateExist = await Landmark.findOne({
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
                const data = await Landmark.create({
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

            if(errVal.length > 1){
                errVal = errVal[0]
            }

            res.status(400).json({message: errVal[0]})
        } else {
            console.log(error);
            res.status(500).json({message: "Internal server error"})
        }
    }
})

app.put('/landmarks/:id', adminAuthorization, async (req, res, next) => {
    const { latitude, longitude, imageUrl, content } = req.body
    const landmarkId = req.params.id

    try {
        const landmarkData = await Landmark.findByPk(landmarkId)

        if(landmarkData){
            const coordinateExist = await Landmark.findOne({
                where: {
                    latitude: latitude,
                    longitude: longitude
                }
            })
            
            if(coordinateExist && coordinateExist.id !== landmarkData.id){
                res.status(400).json({message: "Location already exist in database"})
            } else {
                const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=2d78eafc72cd4a64b0f13609fc011cd1`)
                const additionalData = await response.json()
            
                const landmarkName = additionalData.results[0].name
                const landmarkCountry = additionalData.results[0].country

                if(landmarkName){
                    await Landmark.update({
                        latitude: latitude,
                        longitude: longitude,
                        name: landmarkName,
                        country: landmarkCountry,
                        imageUrl: imageUrl,
                        content: content
                    }, {
                        where: {
                            id: landmarkId
                        }
                    })
            
                    res.status(201).json({message: `Successfully updated data for landmark with ID ${landmarkId}`})
                } else {
                    res.status(400).json({message: "No valid name found for this location"})
                }
            }
        } else {
            res.status(404).json({message: `Landmark with ID ${landmarkId} is not found`})
        }
    } catch (error) {
        if(error.name === 'SequelizeValidationError'){
            let errVal = error.errors.map(el => {return el.message})

            if(errVal.length > 1){
                errVal = errVal[0]
            }

            res.status(400).json({message: errVal[0]})
        } else {
            res.status(500).json({message: "Internal server error"})
        }
    }
})

app.delete('/landmarks/:id', adminAuthorization, async (req, res, next) => {
    const landmarkId = req.params.id

    try {
        const landmarkData = await Landmark.findByPk(landmarkId)

        if(landmarkData){
            await Landmark.destroy({
                where: {
                    id: landmarkId
                }
            })
            res.status(200).json({message: `Bookmark with ID ${landmarkData.id} has been deleted`})
        } else {
            res.status(404).json({message: `Bookmark with ID ${landmarkId} is not found`})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

app.get('/bookmarks', async (req, res, next) => {
    const userId = req.user.id

    try {
        const BookmarkData = await Bookmark.findAll({
            where: {
                UserId: userId
            },
            include: [User, Landmark]
        })

        res.status(200).json({result: BookmarkData})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

app.post('/bookmarks/:LandmarkId', async (req, res, next) => {
    const userId = req.user.id
    const landmarkId = req.params.LandmarkId

    try {
        const landmarkData = await Landmark.findByPk(landmarkId)

        if(landmarkData){
            const bookmarkExist = await Bookmark.findOne({
                where: {
                    UserId: userId,
                    LandmarkId: landmarkId
                }
            })

            if(!bookmarkExist){
                await Bookmark.create({
                    UserId: userId,
                    LandmarkId: landmarkId
                })

                res.status(201).json({message: 'Landmark successfully bookmarked'})
            } else {
                res.status(400).json({message: 'Bookmark already exist'})
            }
        } else {
            res.status(404).json({message: `Landmark with ID ${landmarkId} is not found`})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

app.delete('/bookmarks/:id', authorization, async (req, res, next) => {
    const bookmarkId = req.params.id

    try {
        const bookmarkData = await Bookmark.findByPk(bookmarkId)

        if(bookmarkData){
            await Bookmark.destroy({
                where: {
                    id: bookmarkId
                }
            })
            res.status(200).json({message: `Bookmark with ID ${bookmarkData.id} has been deleted`})
        } else {
            res.status(404).json({message: `Bookmark with ID ${bookmarkId} is not found`})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

app.listen(port, () => {
    console.log('Listening to port:', port);
})