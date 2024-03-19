const mongoose = require('mongoose');
const {Schema} = mongoose

const clientSchema = new Schema({

        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        }

})

const clientModel = mongoose.model('client',clientSchema);
module.exports=clientModel