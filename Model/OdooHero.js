const mongoose = require ('mongoose');
const { Schema } = mongoose;

const odooHeroSchema = new Schema({
    heading1: {
        type: String,
        required: true
    },
    heading2: {
        type: String,
        required: true
    },
    buttonText:{
        type:String,
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
})

const OdooheroModel = mongoose.model('odooHero', odooHeroSchema);

module.exports = OdooheroModel;