
const mongoose = require("mongoose");
const Data = require('./Data.js');

class Colaborator { 
    collection = 'Colaborator';
    schema = {
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
        gender: {
            type: String,
            enum: ['Hombre', 'Mujer'],
            required: true

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
            type: Number,
            default: 1
        }
    };
    data = Data;

    model = mongoose.model(this.collection, this.schema);

    constructor() {

    }   
    
}


module.exports = Colaborator;



