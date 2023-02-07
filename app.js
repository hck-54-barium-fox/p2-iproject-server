require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const router = require('./router')
const errHendler = require('./middleware/errorHandler')

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(router)
app.use(errHendler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})