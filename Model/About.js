const mongoose = require('mongoose');
const { Schema } = mongoose;

const aboutSectionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  welcomeContent: {
    type: String,
    required: true
  },

  buttonText: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true
  },

  marquee: {
    type: String,
    required: true,
  }
});

const AboutModel = mongoose.model('About', aboutSectionSchema);
module.exports = AboutModel;
