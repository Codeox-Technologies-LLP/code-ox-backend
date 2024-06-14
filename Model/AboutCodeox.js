const mongoose = require('mongoose');
const { Schema } = mongoose;

const aboutCodeoxSchema = new Schema({
    title: {
        type: String,
       
    },
    image: {
        type: [String],
       
    },
    contentText: {
        type: String,
       
    },
    cards: [
        {
            cardImage: {
                type:String,
                
            },
            cardDescription:{
                type:String
            },
            cardHeading: {
                type : String,
            }
        }
    ]
});

const AboutcodeoxModel = mongoose.model('aboutcodeox', aboutCodeoxSchema);

module.exports = AboutcodeoxModel;
