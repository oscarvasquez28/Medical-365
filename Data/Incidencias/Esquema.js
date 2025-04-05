import mongoose from "mongoose";
import DatosDummy from './DatosDummy.js'; //

// Define the schema
const tipoIncidenciaSchema = new mongoose.Schema({
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

// Define the TipoIncidencia class
export default class Incidencia {
    collection = 'Incidencia'; // Collection name
    schema = tipoIncidenciaSchema; // Defined schema
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

    // Method to find a tipo de incidencia by ID
    async findById(id) {
        try {
            const tipoIncidencia = await this.model.findOne({ id });
            return tipoIncidencia;
        } catch (error) {
            console.error('Error finding tipo de incidencia by ID:', error);
            throw error;
        }
    }

    // Method to update a tipo de incidencia descripcion
    async updatedescripcion(id, newdescripcion) {
        try {
            await this.model.findOneAndUpdate({ id }, { descripcion: newdescripcion });
            console.log('Tipo de incidencia descripcion updated successfully.');
        } catch (error) {
            console.error('Error updating tipo de incidencia descripcion:', error);
        }
    }
}
