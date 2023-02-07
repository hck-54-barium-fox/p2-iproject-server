const express = require('express')
const router = require('./routes')
const app = express()
const PORT = 3000
const CORS = require('cors')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(CORS())
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })