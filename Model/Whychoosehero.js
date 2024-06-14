const mongoose = require('mongoose')
const { Schema } = mongoose;

const whyChooseHeroSchema = new Schema({
    heading: {
        type: String,
        required: true,
    },
    bgImage: {
        type: String,
        required: true,
    }
})

const WhychooseheroModel = mongoose.model('whyChooseHero', whyChooseHeroSchema);

module.exports = WhychooseheroModel