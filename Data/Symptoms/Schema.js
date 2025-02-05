
const mongoose = require('mongoose');

const Symptoms = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    risk: {
        type: Number,
        required: true
    },
});
