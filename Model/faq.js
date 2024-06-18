const mongoose = require('mongoose');
const { Schema }  = mongoose;

const faqSchema = new Schema ({
            question: {
                type: String,
                required: true
            },
            answer: {
                type: String, 
                required: true
            }
})

const FaqModel = mongoose.model('faq',faqSchema);

module.exports = FaqModel;