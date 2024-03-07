const mongoose = require('mongoose');
const {Schema} = mongoose

const countrySchema = new Schema({
    country:{
        type:Array, 
    },

})

const countryModel = mongoose.model('CountryList',countrySchema);
module.exports=countryModel