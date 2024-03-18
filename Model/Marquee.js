const mongoose = require("mongoose");
const { Schema } = mongoose;

const MarqueeSchema = new Schema({
    Marquee: [
        {
            heading: {
                type: String,
                required: true,
            }
        }
    ]
});

const MarqueeModel = mongoose.model("marquee", MarqueeSchema);
module.exports = MarqueeModel;