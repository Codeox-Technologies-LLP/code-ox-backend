const mongoose = require('mongoose');
const { Schema } = mongoose;

const customizationSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const CustomizationModel = mongoose.model('cuttomization', customizationSchema);

module.exports = CustomizationModel;