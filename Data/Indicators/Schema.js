import mongoose from "mongoose";
import DummyData from './DummyData.js'; //


// Define the schema
const indicatorSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    result: {
        type: Number,
        required: [true, 'Result is required']
    },
    resultDate: {   
        type: Date,
        required: [true, 'Result date is required']
    }
});

// Define the Indicator class
export default class Indicator {
    collection = 'Indicators'; // Collection name
    schema = indicatorSchema; // Defined schema
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

    // Method to find indicators by category
    async findByCategory(category) {
        try {
            const indicators = await this.model.find({ category });
            return indicators;
        } catch (error) {
            console.error('Error finding indicators by category:', error);
            throw error;
        }
    }

    // Method to update the result of an indicator
    async updateResult(id, newResult) {
        try {
            await this.model.findByIdAndUpdate(id, { result: newResult });
            console.log('Result updated successfully.');
        } catch (error) {
            console.error('Error updating result:', error);
        }
    }
}

