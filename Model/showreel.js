const mongoose = require('mongoose');
const { Schema } = mongoose;
const showreel = new Schema({

    image: [{
        type: String,
        required: true,
    }],
    showreelHeading: {
        type: String,
        required: true,
    },
    showreeldescription: {
        type: String,
        required: true,
    },
    showreelHeading1: {
        type: String,
        required: true,
    },
    showreeldescription1: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,

    }

})
const showreelModel = mongoose.model('showreel', showreel);
module.exports = showreelModel;