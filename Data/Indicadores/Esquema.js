import mongoose from "mongoose";
import DatosDummy from './DatosDummy.js'; //


// Define the schema
const indicatorSchema = new mongoose.Schema({
    categoria: {
        type: String,
        required: [true, 'Category is required']
    },
    resultado: {
        type: Number,
        required: [true, 'Result is required']
    },
    fechaResultado: {   
        type: Date,
        required: [true, 'Result date is required']
    }
});

// Define the Indicator class
export default class Indicator {
    collection = 'Indicadores'; // Collection name
    schema = indicatorSchema; // Defined schema
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

    // Method to find indicators by categoria
    async findByCategory(categoria) {
        try {
            const indicators = await this.model.find({ categoria });
            return indicators;
        } catch (error) {
            console.error('Error finding indicators by categoria:', error);
            throw error;
        }
    }

    // Method to update the resultado of an indicator
    async updateResult(id, newResult) {
        try {
            await this.model.findByIdAndUpdate(id, { resultado: newResult });
            console.log('Result updated successfully.');
        } catch (error) {
            console.error('Error updating resultado:', error);
        }
    }
}

