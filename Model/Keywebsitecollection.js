const mongoose = require('mongoose');
const { Schema } = mongoose;

const keywebsitecollectionSchema = new Schema({
    image: [{
        type: String,
        required: true,
    }],
    KeyWebsiteCollectionsHeading: {
        type: String,
        required: true,
    },
    KeyWebsiteCollectionsDescription: {
        type: String,
        required: true,
    },
   
})
const keywebsitecollectionModel = mongoose.model('keywebsitecollection', keywebsitecollectionSchema);

module.exports = keywebsitecollectionModel