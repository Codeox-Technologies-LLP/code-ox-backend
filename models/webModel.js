const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
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
  caseStudies: [{
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true,
    },
    caseStudiesDescription: {
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
    categories: {
      type: String,
      required: true
    }
  }]
});

const WebModel = mongoose.model('WebModel', caseStudySchema);

module.exports = WebModel;
