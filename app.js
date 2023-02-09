if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routers/userRouter");
const favoriteRouter = require("./routers/favoriteRouter");
const paymentRouter = require("./routers/paymentRouter");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/autentication");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to HaFood");
});
app.use(userRouter);
app.use(authentication);
app.use(favoriteRouter);
app.use(paymentRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`HaFood app listening on port ${port}`);
});
