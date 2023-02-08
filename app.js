if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const router = require('./Router/index')
const errorHandler = require('./midlleware/handleError')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/',router)
app.use(errorHandler)

app.listen(port,() => {
    console.log(`example listening ${port}`);
})