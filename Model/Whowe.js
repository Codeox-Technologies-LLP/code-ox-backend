const mongoose = require('mongoose');
const { Schema } = mongoose;

const whoweSchema = new Schema({
    founder: [{
        image: {
            type: String,
            required: true

        },
        name: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },

    }]
})

const founderModel = mongoose.model('founder', whoweSchema);
module.exports = founderModel;