if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const express = require('express')
const router = require('./routes')
const app = express()
const PORT = 3000 || process.env.PORT
const CORS = require('cors')
const midtransClient = require('midtrans-client');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(CORS())
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })