const mongoose = require('mongoose');
const { Schema } = mongoose;

const whyChooseUsSchema = new Schema({
            heading: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
});

const WhyChooseUsModel = mongoose.model('whyChooeUs', whyChooseUsSchema);
module.exports = WhyChooseUsModel;