const mongoose = require('mongoose');
const { Schema } = mongoose;

const valueSchema = new Schema({
    value :[{
        name:{
            type:String,
            required :true

        },
        gif :{
            type:String,
            required:true
        },
        title :{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        }
    }]
})

const valueModel = mongoose.model('value', valueSchema);
module.exports = valueModel;