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
    link:{
      type:String,
      required:true
  },
    heading:{
      type: String,
      required: true,
    },
    heading1:{
      type: String,
      required: true,
    }, 
    marquee:{
      type: String,
      required: true,
    }
});

const AboutModel = mongoose.model('About', aboutSectionSchema);
module.exports = AboutModel;
