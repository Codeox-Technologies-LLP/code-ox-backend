const mongoose = require('mongoose')
const {Schema} = mongoose;

const schema = new Schema({
    logo: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
})

const Blogs = mongoose.model('Blogs', schema)
module.exports = Blogs

