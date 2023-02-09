if (process.env.NODE_ENV !== 'production') { 
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const router = require('./router')
const errHendler = require('./middleware/errorHandler')


app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errHendler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port || 3000}`)
})