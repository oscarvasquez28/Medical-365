import mongoose from "mongoose";
import DatosDummy from './DatosDummy.js'; //

export default class Citas {
    collection = 'Citas';
    data = {};

    schema = new mongoose.Schema({
        folio: {
            type: String, // Changed to String to accommodate the generated value
            required: false, // Not required since it will be generated
            unique: true // Ensure caseFolio is unique
        },
        paciente: {
            type: Number,
            required: true
        },
        doctor: {
            type: Number,
            required: true
        },
        riesgo: {
            type: String,
            enum: ['bajo', 'medio', 'alto'],
            required: true,
        },
        descripcion: {
            type: String,
            required: true
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
            type: Number,
            required: true
        },
        estatus: {
            type: String,
            enum: ['pendiente', 'cerrado', 'cancelado'],
            required: true
        }
    });

    constructor() {
        this.#Init();
    }

    #Init() {
        // Define pre-save middleware to generate caseFolio
        this.schema.pre('save', function (next) {
            if (!this.folio) {
                // Generate caseFolio using fechaCreacion, patient, and doctor
                this.folio = `${this.fechaCreacion.getTime()}${this.paciente}${this.doctor}`;
            }
            next();
        });

        // Initialize the model
        this.model = mongoose.model(this.collection, this.schema);
        this.data = DatosDummy;
    }
}

