const mongoose = require('mongoose')
const { Schema } = mongoose;


const whyChooseSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

const WhychooseModel = mongoose.model('whyChoose', whyChooseSchema);

module.exports = WhychooseModel