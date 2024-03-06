const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    marquee: {
        type: String,
        required: true,
    },
    mainDescription: {
        type: String,
        required: true,
    },
    gifContent: {
        type: String,
        required: true,
    },
    buttonLink: {
        type: String,
        required: true,
    },
    gif: {
        type: String,
        required: true,
    },
    imageCards: [
        {
            image: {
                type: String,
                required: true
            },
            cardHeading: {
                type: String,
                required: true
            },
            cardDescription: {
                type: String,
                required: true
            }
        }
    ]
});

const Content = mongoose.model('About', aboutSchema);

module.exports = Content;
