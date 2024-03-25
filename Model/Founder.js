const mongoose = require('mongoose');
const { Schema } = mongoose;

const founderSchema = new Schema({
    founder: [{
        image: {
            type: String,
            required: true

        },
        name: {
            type: String,
            required: true
        },
      
        role: {
            type: String,
            required: true
        },

    }]
})

const founderModel = mongoose.model('founder', founderSchema);
module.exports = founderModel;