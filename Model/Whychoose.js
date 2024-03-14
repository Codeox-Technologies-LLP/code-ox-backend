const mongoose = require('mongoose')
const { Schema } = mongoose;


const whyChooseSchema = new Schema({

   

    WhyCodeOx: [{
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        WhyCodeOxDescription: {
            type: String,
            required: true,
        },
        WhyCodeOxHeading: {
            type: String,
            required: true
        },
      
    }],
})

const WhychooseModel = mongoose.model('whyChooseSchema', whyChooseSchema);

module.exports = WhychooseModel