const mongoose = require('mongoose');
const { Schema } = mongoose;


const aboutOdooSchema = new Schema({
    title: {
        type: String,
    },
    list: [{
        description: {
            type: String,
            required: true
        }
    }]
});

const AboutodooModel = mongoose.model('aboutodoo', aboutOdooSchema);

module.exports = AboutodooModel;