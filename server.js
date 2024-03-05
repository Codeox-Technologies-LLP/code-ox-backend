const express = require('express')
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const  router  = require('./Routes/Routes');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api',router)

const dotenvConfig = dotenv.config({
  path: path.resolve(__dirname, "./config", "config.env"),
});


mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected ");
    app.listen(process.env.PORT, () => {
      console.log(`Server Connected at ${process.env.PORT}`);
    });
  });
