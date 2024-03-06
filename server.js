const express = require('express')
const dotenv = require("dotenv");
const path = require("path");


const app = express()
app.use(express.json())
const dotenvConfig = dotenv.config({
  path: path.resolve(__dirname, "./config", "config.env"),
});

///path
const contentRouter = require('./routes/webPage');
app.use('/api', contentRouter);


const mongoose = require("mongoose");
console.log(process.env.MONGO);
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


//multer
