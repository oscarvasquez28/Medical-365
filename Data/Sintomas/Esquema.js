import mongoose from "mongoose";
import DatosDummy from './DatosDummy.js'; //


// Define the schema
const SintomaSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: [true, 'descripcion is required']
    },
    riesgo: {
        type: Number,
        required: [true, 'riesgo is required'],
        min: [0, 'riesgo cannot be less than 0'],
        max: [10, 'riesgo cannot be greater than 10']
    }
});

// Define the Sintoma class
export default class Sintoma {
    collection = 'Sintomas'; // Collection name
    schema = SintomaSchema; // Defined schema
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

    // Method to find Sintomas by riesgo level
    async findByriesgo(riesgo) {
        try {
            const Sintomas = await this.model.find({ riesgo });
            return Sintomas;
        } catch (error) {
            console.error('Error finding Sintomas by riesgo:', error);
            throw error;
        }
    }

    // Method to update the descripcion of a Sintoma
    async updatedescripcion(id, newdescripcion) {
        try {
            await this.model.findByIdAndUpdate(id, { descripcion: newdescripcion });
            console.log('descripcion updated successfully.');
        } catch (error) {
            console.error('Error updating descripcion:', error);
        }
    }
}
