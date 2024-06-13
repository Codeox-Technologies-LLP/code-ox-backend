const mongoose = require('mongoose');
const { Schema } = mongoose;

const solutionSchema = new Schema({
            heading: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
});

const SolutionModel = mongoose.model('solution', solutionSchema);
module.exports = SolutionModel;