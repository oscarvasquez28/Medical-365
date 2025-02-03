const mongoose = require('mongoose');

const Colaborators = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Number,   
        min: 0
    },
    creatingDate: {
        type: Date,
        default: Date.now 
    },
    updatingDate: {
        type: Date,   
        default: new Date('1970-01-01')
    },
    deletionDate: {
        type: Date,   
        default: new Date('1970-01-01')
    },
    age: {
        type: Number,   
        min: 0
    },
    activo: {
        type: number,
        default: 1
    }

});
