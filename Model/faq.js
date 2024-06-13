const mongoose = require('mongoose');
const { Schema }  = mongoose;

const faqSchema = new Schema ({
            question: {
                type: String,
               
            },
            answer: {
                type: String,
               
            }
})

const FaqModel = mongoose.model('faq',faqSchema);

module.exports = FaqModel;