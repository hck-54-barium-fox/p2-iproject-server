const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const app = express()
const port = 3000
const router = require("./routes/index")
const cors = require("cors")


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", router)
app.use(errorHandler)


app.listen( port , ()=> {
    console.log("Barium-Box running port", port);
})