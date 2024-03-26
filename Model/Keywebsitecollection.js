const mongoose = require('mongoose');
const { Schema } = mongoose;

const keywebsitecollectionSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
   
})
const keywebsitecollectionModel = mongoose.model('keywebsitecollection', keywebsitecollectionSchema);

module.exports = keywebsitecollectionModel