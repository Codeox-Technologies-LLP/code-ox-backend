const mongoose = require('mongoose');
const { Schema } = mongoose;

const countSchema = new Schema({
    
        
        title:{
            type:String,
            required:true
        },
        count:{
            type:String,
            required:true

        }
  
},{ timestamps: true })

const countModel = mongoose.model('count', countSchema);
module.exports = countModel;