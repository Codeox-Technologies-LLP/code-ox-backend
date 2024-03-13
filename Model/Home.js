const mongoose = require('mongoose');
const { Schema } = mongoose;

const homeSectionSchema = new Schema({
    hero: [{
        image: {
            type: String,
            // required: true
        },
        heading: {
            type: String,
            required: true,
        },
        subHeading: {
            type: String,
            required: true,
        }
    }],

    marqueeText: {
        type: String,
        required: true
    },

   
  
    WhyCodeOxHeading: {
        type: String,
        // required: true
    },
    WhyCodeOxDescription: {
        type: String,
        required: true,
    },

    WhyCodeOx: [{
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }],





    Client: [{
        image: {
            type: String,
            required: true,
        },
        categories: {
            type: String,
            required: true
        }
    }],

});

const HomeModel = mongoose.model('Home', homeSectionSchema);
module.exports = HomeModel;
