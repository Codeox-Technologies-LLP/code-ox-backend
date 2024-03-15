const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamMemberSchema = new Schema({
    image: {
        type: String,
        required: true
    },

});

const TeamSchema = new Schema({
    team: [TeamMemberSchema] // Use the TeamMemberSchema as the array element schema
});

const teamModel = mongoose.model('Team', TeamSchema);
module.exports = teamModel;
