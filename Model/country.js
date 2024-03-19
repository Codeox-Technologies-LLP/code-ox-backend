const mongoose = require('mongoose');
const {Schema} = mongoose

const countrySchema = new Schema({
 type:Object
})

const countryModel = mongoose.model('CountryList',countrySchema);
module.exports=countryModel