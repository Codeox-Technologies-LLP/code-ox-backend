const mongoose = require('mongoose')

const heroCaseStudy = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      }
})

module.exports = mongoose.model('hero-casestudy', heroCaseStudy);