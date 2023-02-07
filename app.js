const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const router = require('./routes/index')
const { errorHandler } = require('./middleware/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`I LOVE YOU ${port}`)
})