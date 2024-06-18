const mongoose = require('mongoose');
const { Schema } = mongoose;

const pageContentsSchema = new Schema({
    heading : {
        type:String,
        required: true,
    },
    description : {
        type:String,
    },
    key : {
        type:String,
        required:true,
    }
    
},{
    timestamps:true,
})

const PagContentModel = mongoose.model('pagecontent',pageContentsSchema);

module.exports = PagContentModel;