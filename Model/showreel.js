const mongoose = require('mongoose');
const { Schema } = mongoose;
const showreel = new Schema({
showreel: [{
    image: {
        type: String,
        required: true,
    },
    showreelHeading: {
        type: String,
        required: true,
    },
    showreeldescripation: {
        type: String,
        required: true,
    },
    showreelheading1: {
        type: String,
        required: true,
    },
    showreeldescripation1:{
        type:String,
        required:true
    }
}],
})
const showreelModel = mongoose.model('showreel', showreel);
module.exports = showreelModel;