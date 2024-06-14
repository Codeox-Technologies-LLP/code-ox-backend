const mongoose = require('mongoose');
const { schema } = require('./country');
const { Schema } = mongoose;

const partnerwithusSchema = new Schema ({
    Icon: {
        type: [String],
        required: true
    },
    title:{
       type: [String],
        required: true
    } ,
    description: {
        type: String,
        required: true
    }
})