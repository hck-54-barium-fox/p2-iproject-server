const express = require('express')
const cors = require('cors')
const Controller = require('./controllers/controller')
const port = 3000
const app = express()
const { authentication } = require('./middlewares/auth')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', Controller.register)
app.post('/login', Controller.login)

app.use(authentication)

app.get('/shoes', Controller.getShoes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})