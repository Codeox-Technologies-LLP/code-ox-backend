const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    project: [{
        projectHappyClient: {
            type: Schema.Types.Mixed, 
            required: true
        },
        projectTaskDone: {
            type: Schema.Types.Mixed, 
            required: true
        },
        projectCompleted: {
            type: Schema.Types.Mixed, 
            required: true
        },

    }]
})

const valueModel = mongoose.model('projectSchema', projectSchema);
module.exports = valueModel;