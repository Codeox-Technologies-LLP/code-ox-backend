const mongoose = require ('mongoose');
const { Schema } = mongoose;

const odooHeroSchema = new Schema({
    backgroundImage: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
   
})

const OdooheroModel = mongoose.model('odooHero', odooHeroSchema);

module.exports = OdooheroModel;