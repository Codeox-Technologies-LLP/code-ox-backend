const mongoose = require('mongoose');
const { Schema } = mongoose;

const odooAboutusSchema = new Schema({
    heading: {
        type: String,
        required: true
    },
    paraContent: {
        type: String,
        required: true
    },
    buttonText: {
        type: String,
        required: true
    },
    buttonLink: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const OdooaboutusModel = mongoose.model('odooaboutus', odooAboutusSchema);
    
module.exports =  OdooaboutusModel;