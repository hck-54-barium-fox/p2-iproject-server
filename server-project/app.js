const express = require('express');
const Controller = require('./Controller/controller');
const app = express()
const port = 1812

const steamid = '76561198192946697'

const steamApiKey = 'FBDD4952A898BE1A214681A570F40B41';

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

app.post('/register',Controller.register)

app.post('/login',Controller.login)

app.get('/games',Controller.fetchGames)


app.get('/newsTechnlogies',Controller.fetchNewsTechnologies)

app.get('/games/:id',Controller.fetchGamesById)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})