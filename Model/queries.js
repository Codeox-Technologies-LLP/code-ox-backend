const mongoose =require('mongoose');
const {Schema}=mongoose

const queries= new Schema({
    name:{
        type:String,
        required:true,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        maxlength:100
    },
    countryCode:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
    //     min:1000000000,
    //    max:9999999999,
    },
    message:{
        type:String,
        required:true,
        maxlength:1000
    },
    createdAt:{
       type:Date,default:Date.now
    }
})

const querymodel=mongoose.model('Queries',queries);
module.exports= querymodel;