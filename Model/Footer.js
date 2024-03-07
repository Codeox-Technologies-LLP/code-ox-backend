const mongoose = require('mongoose');
const {Schema}= mongoose


const footerSchema= new Schema({
logo:{
    type:String,
    required:true
,
navMenu:[{
    menuheading:{
        type:String,
        required:true
    },
    menulist:{
        type: Array,
        required: true
    }
}],
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

}


})

const footerModel=mongoose.model('footer',footerSchema)
module.exports=footerModel