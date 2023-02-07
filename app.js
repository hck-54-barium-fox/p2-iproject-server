const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const { url } = require('inspector')
const router = require('./routes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(router)

app.listen(port, () => {
    console.log(`listening to the app port ${port}`);
})