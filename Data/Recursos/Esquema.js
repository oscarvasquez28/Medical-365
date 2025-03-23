import mongoose from "mongoose";
import DatosDummy from './DatosDummy.js'; //

// Define the schema
const toolingSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Name is required']
    },
    version: {
        type: String,
        required: [true, 'Version is required']
    },
    descripcion: {
        type: String,
        default: '' // Optional field, default is an empty string
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
        required: [true, 'Creating date is required']
    },
    fechaActualizacion: {
        type: Date,
        default: null // No default value, optional field
    },
    fechaEliminacion: {
        type: Date,
        default: null // No default value, optional field
    },
    lastColaboratorWhoModified: {
        type: Number,
        default: null // No default value, optional field
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

