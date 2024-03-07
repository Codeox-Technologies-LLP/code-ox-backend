const mongoose = require('mongoose');
const {Schema}= mongoose


const footerSchema= new Schema({
address:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
phone:{
    type:String,
    required:true
},
socialmedia:[{
    name:{    
        type:String,
        required:true
    },
    icon:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
}]
})

const footerModel=mongoose.model('footer',footerSchema)
module.exports=footerModel