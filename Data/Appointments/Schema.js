const mongoose = require('mongoose');

const Appointments = new mongoose.Schema({
    folio: {
        type: Number,
        required: true
    },
    patient: {
        type: Number,
        required: true
    },
    doctor: {
        type: Number,
        required: true
    },
    risk: {
        type: String,
        enum: ['bajo', 'medio', 'alto'],
        required: true,
    },
    description: {
        type: String,   
        required: true
    },
    appointmentDate: {
        type: Date,
        required: false
    },
    creatingDate: {
        type: Date,
        default: Date.now() 
    },
    updatingDate: {
        type: Date,   
        default: new Date('1970-01-01')
    },
    deletionDate: {
        type: Date,   
        default: new Date('1970-01-01')
    },
    lastColaboratorWhoModify: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'cerrado', 'cancelado'],
    }
});

// Middleware para generar el folio antes de guardar
usuarioSchema.pre('save', function (next) {
    // Concatenar columna1 y columna2, y convertirlos a número
    this.folio = Number(this.columna1 + this.columna2);
    next();
});
