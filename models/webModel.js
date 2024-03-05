// models/webModel.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  subheading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttonLink: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
},

);

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
