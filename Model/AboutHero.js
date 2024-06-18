const mongoose = require('mongoose');
const { Schema } = mongoose;

const abouthHeroSchema = new Schema({
       image: {
            type: String,
            required: true
        },
        heading: {
            type: String,
            required: true,
        },
        heading1: {
            type: String,
            required: true,
        },
       

});

const HeroModel = mongoose.model('about hero', abouthHeroSchema);
module.exports = HeroModel;
