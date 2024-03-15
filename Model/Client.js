const mongoose = require('mongoose');
const {Schema} = mongoose

const clientSchema = new Schema({
    Client: [{
        image: {
            type: String,
            required: true,
        },
        categories: {
            type: String,
            required: true
        }
    }],

})

const clientModel = mongoose.model('client',clientSchema);
module.exports=clientModel