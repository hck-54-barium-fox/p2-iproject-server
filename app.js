if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const env = require('dotenv');
const express = require('express')
const app = express()
const port = 6060
const cors = require('cors');
const router = require('./routers');
const errorHandler = require('./middleware/error-handler');


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())



app.use('/', router)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})  