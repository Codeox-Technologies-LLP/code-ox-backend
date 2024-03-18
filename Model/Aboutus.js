const mongoose = require("mongoose");
const { Schema } = mongoose;

const aboutUsSchema = new Schema({
    aboutUs: [
        {
            heading: {
                type: String,
                required: true,
            },
            shortDescripation: {
                type: String,
                required: true,
            },
            descripation: {
                type: String,
                required: true,
            },
        },
    ],
});

const AboutsModel = mongoose.model("aboutus", aboutUsSchema);
module.exports = AboutsModel;