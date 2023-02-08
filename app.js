if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const Controller = require('./controllers/controller')
const port = 3000
const app = express()
const { authentication } = require('./middlewares/auth')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.get('/shoes', Controller.getShoes)

app.use(authentication)

app.get('/mycart', Controller.getMyCart)
app.post('/mycart/:shoeId', Controller.addToCart)
app.patch('/mycart/:cartId', Controller.reduceCart)
app.post('/checkOngkir', Controller.checkOngkir)
app.post('/generate-midtrans-token', Controller.midtransToken)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})