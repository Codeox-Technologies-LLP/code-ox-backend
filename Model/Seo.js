const mongoose = require('mongoose')
const { Schema } = mongoose;

const seoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  keywords: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
});

const Seo = mongoose.model('Seo', seoSchema);
module.exports = Seo;