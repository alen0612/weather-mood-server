const express = require("express");
//const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
//app.use(cors());

app.get("/", (req, res) => {
  res.send("Server runs well!");
});

const db = require("./models");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "accessToken, Content-Type");
  next();
});

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const userRouter = require("./routes/Users");
app.use("/users", userRouter);

const port = process.env.port || 3000 || 8080 || 3306;

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("----------------------------------");
      console.log("|                                |");
      console.log("|  Server running on port 3000!  |");
      console.log("|                                |");
      console.log("----------------------------------");
    });
  })
  .catch((err) => {
    console.log(err);
  });
