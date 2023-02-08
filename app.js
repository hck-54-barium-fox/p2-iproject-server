const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const router = require('./routes')
const { errorHandler } = require('./middlewear/errorHandler')


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening to the app port ${port}`);
})