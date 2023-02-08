if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  }

const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/', router)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})