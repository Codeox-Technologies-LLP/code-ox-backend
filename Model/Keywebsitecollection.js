const mongoose = require('mongoose');
const { Schema } = mongoose;

const keywebsitecollectionSchema = new Schema({

    KeyWebsiteCollectionsHeading: {
        type: String,
        required: true,
    },
    KeyWebsiteCollectionsDescription: {
        type: String,
        required: true,
    },
    image: [{
        type: String,
        required: true,
    }],
})
const keywebsitecollectionModel = mongoose.model('keywebsitecollection', keywebsitecollectionSchema);

module.exports = keywebsitecollectionModel