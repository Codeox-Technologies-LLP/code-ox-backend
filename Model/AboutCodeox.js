const mongoose = require('mongoose');
const { Schema } = mongoose;

const aboutCodeoxSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    contentText: {
        type: String,
        required: true
    }
});

const AboutcodeoxModel = mongoose.model('aboutcodeox', aboutCodeoxSchema);

module.exports = AboutcodeoxModel;
