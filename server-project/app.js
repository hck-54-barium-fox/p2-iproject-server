const express = require('express');
const Controller = require('./Controller/controller');
const app = express()
// const port = process.env.PORT

const port = 1812
const cors = require('cors');
const { authentication } = require('./middleware/auth');
const steamid = '76561198192946697'

const steamApiKey = 'FBDD4952A898BE1A214681A570F40B41';

// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.post('/register', Controller.register)

app.post('/login', Controller.login)

app.post('/sendmailRegister', Controller.Registermail)

app.use(authentication)


app.get('/profile', Controller.profile)


app.get('/games', Controller.fetchGames)

app.patch('/updatePaid', Controller.changeUpaid)

app.post('/generateMitransToken', Controller.generateMitransToken)

app.get('/newsTechnlogies', Controller.fetchNewsTechnologies)

app.get('/gamesData', Controller.fetchDataGamesSteamAppId)

app.get('/newsTechnlogies/:id', Controller.newsTechnlogiesById)

app.get('/games/:id', Controller.fetchGamesById)





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})