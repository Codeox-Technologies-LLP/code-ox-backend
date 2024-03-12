const mongoose=require('mongoose');
const {Schema}=mongoose;

const erpSchema=new Schema({
projects:[{
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
     }
}]
})
const erpModel = mongoose.model('erp',erpSchema);

module.exports=erpModel