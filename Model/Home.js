const mongoose = require('mongoose');
const { Schema } = mongoose;

const homeSectionSchema = new Schema({
    hero: [{
        image: {
            type: String,
            required: true
        },
        heading: {
            type: String,
            required: true,
        },
        subHeading: {
            type: String,
            required: true,
        },
        marqueeText: {
            type: String,
            required: true
        },
    }],

    


  

});

const HomeModel = mongoose.model('Home', homeSectionSchema);
module.exports = HomeModel;
