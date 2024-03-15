const mongoose = require('mongoose');
const { Schema } = mongoose;

const  locationSchema = new Schema({
    location: [{
        // image: {
        //     type: String,
        //     required: true
        // },
        heading: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        // marqueeText: {
        //     type: String,
        //     required: true
        // },
    }],

    


  

});

const locationModel = mongoose.model('location', locationSchema);
module.exports = locationModel;
