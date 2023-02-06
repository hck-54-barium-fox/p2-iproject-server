// TODO - dotenv setup
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const router = require('./router');
const app = express()
const port = process.env.PORT || 7777

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})