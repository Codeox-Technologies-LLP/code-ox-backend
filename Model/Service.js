const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
 
   
      
            image: {
                type: String,
                required: true,
            },
            servicesHeading: {
                type: String,
                required: true,
            },
            servicesDescripation: {
                type: String,
                required: true,
            },
    
      
    
});

const servicesModel = mongoose.model('service', serviceSchema);
module.exports = servicesModel;
