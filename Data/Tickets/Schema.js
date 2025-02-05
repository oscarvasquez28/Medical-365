const mongoose = require('mongoose');

const Tickets = new mongoose.Schema({
    patient: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        enum: ['tos', 'gripe', "sangre"],
        required: true,
    },
    risk: {
        type: Number,
        required: true,
    },
    creationDate: {
        type: Date,   
        default: Date.now()
    },
    closingDate: {
        type: Date,   
        required: false,
    },
    result: {
        type: String,
        enum: ['baja', 'media', 'alta'],
        required: false,
    },
    comments: {
        type: String,
        requried: true
    }

});
