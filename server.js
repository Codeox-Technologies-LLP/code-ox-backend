const express = require('express')
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const  router  = require('./Routes/Routes');
const multer = require('multer')
const cors = require('cors')
const app = express()
app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api',router)
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static('uploads'));

const dotenvConfig = dotenv.config({
  path: path.resolve(__dirname, "./config", "config.env"),
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer errors
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ statusCode:400,success:false, message: 'Unexpected field: ' + err.field });
    }
    // Handle other Multer errors
    return res.status(500).json({ statusCode:500,success:false,message: 'Internal server error: ' + err.message });
  } else if (err) {
    // Handle other errors
    console.error('Unexpected error:', err);
    return res.status(500).json({ statusCode:400,success:false,message: 'Internal server error: ' + err.message });
  }
  next();
});

mongoose
  .connect(process.env.MONGO, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected ");
    app.listen(process.env.PORT, () => {
      console.log(`Server Connected at ${process.env.PORT}`);
    });
  });
