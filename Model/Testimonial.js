const mongoose=require('mongoose');
const {Schema}=mongoose;

const testimonial=new Schema({

    image: {
        type: String,
        required: true,
    },
    testimonialsdescription: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorCompany: {
        type: String,
        required: true,
    }

})
const testimonialModel = mongoose.model('testimonial',testimonial);

module.exports=testimonialModel