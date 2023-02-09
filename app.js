if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    }
const cors = require('cors')
const express = require('express');
const app = express()
const port = process.env.PORT|| 3000

app.use(cors())
const routes = require('./routes/index');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


