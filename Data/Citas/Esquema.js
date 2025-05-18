import mongoose from "mongoose";
import DatosDummy from './DatosDummy.js'; //

// Define the schema
const citaSchema = new mongoose.Schema({
    folio: {
            type: String, // Changed to String to accommodate the generated value
            required: false, // Not required since it will be generated
            unique: true // Ensure caseFolio is unique
        },
        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tickets', // Reference to the Tickets collection
            required: true
        },
        doctor: {
            type: String,
            required: true
        },
        recurso: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recursos', // Reference to the Recursos collection
        },
        riesgo: {
            type: String,
            enum: ['Bajo', 'Medio', 'Alto'],
            required: true,
        },
        diagnostico: {
            type: String,
        },
        fechaCita: {
            type: Date,
            required: false
        },
        fechaCreacion: {
            type: Date,
            default: Date.now // Use Date.now as a function
        },
        fechaActualizacion: {
            type: Date,
            default: new Date('1970-01-01')
        },
        fechaEliminacion: {
            type: Date,
            default: new Date('1970-01-01')
        },
        ultimoUsuarioEnModificar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Colaboradores', // Reference to the Colaboradores collection
            required: true
        },
        estatus: {
            type: String,
            enum: ['Pendiente', 'Cerrado', 'Cancelado'],
            required: true
        }
});
    

export default class Citas {

    collection = 'Citas';
    schema = citaSchema;
    model = mongoose.model(this.collection, this.schema);
    data = DatosDummy;

    constructor() {
        
    }

}

