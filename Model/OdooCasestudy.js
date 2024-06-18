const mongoose = require ('mongoose')
const { Schema } = mongoose;

const odooCasestudySchema = new  Schema({
            title: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
        
});

const casestudyModel = mongoose.model('odooCaseStudy', odooCasestudySchema);
module.exports = casestudyModel;