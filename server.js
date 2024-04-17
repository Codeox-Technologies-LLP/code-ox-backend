const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./Routes/Routes');
const multer = require('multer');
const app = express();

// Enable CORS middleware
app.use(cors());

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer errors
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ statusCode: 400, success: false, message: 'Unexpected field: ' + err.field });
    }
    // Handle other Multer errors
    return res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error: ' + err.message });
  } else if (err) {
    // Handle other errors
    console.error('Unexpected error:', err);
    return res.status(500).json({ statusCode: 400, success: false, message: 'Internal server error: ' + err.message });
  }
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database Connected ");
  // Start the server
  app.listen(process.env.PORT, () => {
    console.log(`Server Connected at ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.error("Database connection error:", err);
});
