if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const errorHandler = require('./middleWare/errorHandler');
const app = express()
const PORT = process.env.PORT || 4000
const cors = require('cors')
const route = require('./routes/index');

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', route)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Running at localhost:${PORT}`)
})
