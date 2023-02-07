if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express')
const app = express()
const port = 3000
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors");
const axios = require('axios')
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const router = require('./router')
app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})