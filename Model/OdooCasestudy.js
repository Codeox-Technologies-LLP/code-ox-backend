const mongoose = require ('mongoose')
const { Schema } = mongoose;

const odooCasestudySchema = new  Schema({
    caseStudy:[
        {
            hedingContent: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
        }
    ]
})