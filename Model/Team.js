const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
team:[{


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

});


const teamModel = mongoose.model('team', teamSchema);
module.exports = teamModel;
