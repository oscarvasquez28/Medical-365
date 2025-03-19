import mongoose from "mongoose";
import DatosDummy from './DatosDummy.js'; //

// Define the schema
const riesgoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID is required'],
        unique: true // Ensure the ID is unique
    },
    descripcion: {
        type: String,
        required: [true, 'descripcion is required']
    }
});

// Define the riesgo class
export default class Riesgo {
    collection = 'Riesgos'; // Collection name
    schema = riesgoSchema; // Defined schema
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

    // Method to find a riesgo by ID
    async findById(id) {
        try {
            const riesgo = await this.model.findOne({ id });
            return riesgo;
        } catch (error) {
            console.error('Error finding riesgo by ID:', error);
            throw error;
        }
    }

    // Method to update a riesgo descripcion
    async updatedescripcion(id, newdescripcion) {
        try {
            await this.model.findOneAndUpdate({ id }, { descripcion: newdescripcion });
            console.log('riesgo descripcion updated successfully.');
        } catch (error) {
            console.error('Error updating riesgo descripcion:', error);
        }
    }
}
