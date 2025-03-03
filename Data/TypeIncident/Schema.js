import mongoose from "mongoose";
import DummyData from './DummyData.js'; //

// Define the schema
const tipoIncidenciaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID is required'],
        unique: true // Ensure the ID is unique
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }
});

// Define the TipoIncidencia class
export default class TypeIncident {
    collection = 'TypeIncident'; // Collection name
    schema = tipoIncidenciaSchema; // Defined schema
    data = DummyData; // Dummy data
    model = mongoose.model(this.collection, this.schema); // Mongoose model

    constructor() {
        // You can initialize things here if needed
    }

    // Method to insert dummy data
    async insertDummyData() {
        try {
            await this.model.insertMany(DummyData);
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

    // Method to update a tipo de incidencia description
    async updateDescription(id, newDescription) {
        try {
            await this.model.findOneAndUpdate({ id }, { description: newDescription });
            console.log('Tipo de incidencia description updated successfully.');
        } catch (error) {
            console.error('Error updating tipo de incidencia description:', error);
        }
    }
}
