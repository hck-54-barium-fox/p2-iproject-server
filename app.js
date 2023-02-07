const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const Controller = require('./Controllers/controller')
const authentication = require('./middleware/auth')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/register', Controller.register)
app.post('/login', Controller.login)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})