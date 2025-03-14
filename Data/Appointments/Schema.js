import mongoose from "mongoose";
import DummyData from './DummyData.js'; //

export default class Appointments {
    collection = 'Appointments';
    model = '';
    data = {};

    schema = new mongoose.Schema({
        caseFolio: {
            type: String, // Changed to String to accommodate the generated value
            required: true,
            unique: true // Ensure caseFolio is unique
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
            default: Date.now // Use Date.now as a function
        },
        updatingDate: {
            type: Date,
            default: new Date('1970-01-01')
        },
        deletionDate: {
            type: Date,
            default: new Date('1970-01-01')
        },
        lastWhoModify: {
            type: Number,
            required: true
        },
        status: {
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
            if (!this.caseFolio) {
                // Generate caseFolio using creatingDate, patient, and doctor
                this.caseFolio = `${this.creatingDate.getTime()}${this.patient}${this.doctor}`;
            }
            next();
        });

        // Initialize the model
        this.model = mongoose.model(this.collection, this.schema);
        this.data = DummyData;
    }
}

