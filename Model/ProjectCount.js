const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    projectCount: [{
        projectHappyClient: {
            type: String, 
            required: true
        },
        projectTaskDone: {
            type: String, 
            required: true
        },
        projectCompleted: {
            type: String, 
            required: true
        },

    }]
})

const valueModel = mongoose.model('projectSchema', projectSchema);
module.exports = valueModel;