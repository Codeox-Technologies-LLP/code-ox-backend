const mongoose = require('mongoose');
const bg = require('../middlewares/bg')

const caseStudySchema = new mongoose.Schema({

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
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  bg: {
    type: String,
    required: true
  },
  titleTextColor: {
    type: String,
    required: true
  }

});

const caseStudiesModel = mongoose.model('case-studies', caseStudySchema);

module.exports = caseStudiesModel;
