const mongoose = require('mongoose');

const Indicators = new mongoose.Schema({
    category: {
        type: Object,
        required: true
    },
    result: {
        type: Number,
        required: true
    },
    resultDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
});
