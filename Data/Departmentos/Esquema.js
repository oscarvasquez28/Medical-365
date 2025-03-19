import mongoose from "mongoose";
import DatosDummy from './DatosDummy.js'; //

// Define the schema
const departamentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID is required'],
        unique: true // Ensure the ID is unique
    },
    descripcion: {
        type: String,
        required: [true, 'descripcion is required']
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
    }
});

// Define the Departamento class
export default class Departamento {
    collection = 'Departamento'; // Collection name
    schema = departamentSchema; // Defined schema
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

    // Method to find a departamento by ID
    async findById(id) {
        try {
            const departamento = await this.model.findOne({ id });
            return departamento;
        } catch (error) {
            console.error('Error finding departamento by ID:', error);
            throw error;
        }
    }

    // Method to update a departamento descripcion
    async updatedescripcion(id, newdescripcion) {
        try {
            await this.model.findOneAndUpdate(
                { id }, 
                { 
                    descripcion: newdescripcion, 
                    fechaActualizacion: Date.now() // Automatically set the updating date
                }
            );
            console.log('Departamento descripcion updated successfully.');
        } catch (error) {
            console.error('Error updating departamento descripcion:', error);
        }
    }
}
