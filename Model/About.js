const mongoose = require('mongoose');
const { Schema } = mongoose;

const aboutSectionSchema = new Schema({
    descripation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    aboutContent: {
      type: String,
      required: true
    },

    aboutButton: {
      type: String,
      required: true,
    },
    aboutButtonLink: {
      type: String,
      required: true,
    },
});

const AboutModel = mongoose.model('About', aboutSectionSchema);
module.exports = AboutModel;
