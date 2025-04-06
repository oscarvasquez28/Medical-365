import mongoose from "mongoose";
import DatosDummy from './DatosDummy.js'; //

// Define the schema
const toolingSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    version: {
        type: String,
        required: [true, 'La versión es obligatoria']
    },
    descripcion: {
        type: String,
    },
    estatus: {
        type: String,
        enum: ['activo', 'inactivo', 'pendiente'],
        required: [true, 'El estatus es obligatorio']
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
        required: [true, 'La fecha de creación es obligatoria']
    },
    fechaActualizacion: {
        type: Date,
        default: null // Sin valor por defecto, campo opcional
    },
    fechaEliminacion: {
        type: Date,
        default: null // Sin valor por defecto, campo opcional
    },
    lastColaboratorWhoModified: {
        type: Number,
        default: null // Sin valor por defecto, campo opcional
    }
});

// Define the Recursos class
export default class Recursos {
    collection = 'Recursos'; // Collection nombre
    schema = toolingSchema; // Defined schema
    data = DatosDummy; // Dummy data
    model = mongoose.model(this.collection, this.schema); // Mongoose model

    constructor() {
        // You can initialize things here if needed
    }

    // Method to insert dummy data
    async insertDatosDummy() {
        try {
            await this.model.insertMany(DatosDummy);
            console.log('Dummy data inserted successfully.');
        } catch (error) {
            console.error('Error inserting dummy data:', error);
        }
    }

    // Method to find toolings by nombre
    async findByName(nombre) {
        try {
            const toolings = await this.model.find({ nombre });
            return toolings;
        } catch (error) {
            console.error('Error finding toolings by nombre:', error);
            throw error;
        }
    }

    // Method to update a tooling
    async updateTooling(id, newData) {
        try {
            await this.model.findByIdAndUpdate(id, { 
                ...newData, 
                fechaActualizacion: Date.now() // Automatically set the updating date
            });
            console.log('Recursos updated successfully.');
        } catch (error) {
            console.error('Error updating tooling:', error);
        }
    }
}

