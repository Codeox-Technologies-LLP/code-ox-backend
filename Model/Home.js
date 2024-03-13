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




    Testimonials: [{
        image: {
            type: String,
            required: true,
        },
        testimonialsdescription: {
            type: String,
            required: true,
        },
        authorName: {
            type: String,
            required: true,
        },
        authorCompany: {
            type: String,
            required: true,
        }
    }],


    KeyWebsiteCollections: [{
        KeyWebsiteCollectionsHeading: {
            type: String,
            required: true,
        },
        KeyWebsiteCollectionsDescription: {
            type: String,
            required: true,
        },
        image: {
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