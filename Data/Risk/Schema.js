import mongoose from "mongoose";
import DummyData from './DummyData.js'; //

// Define the schema
const riskSchema = new mongoose.Schema({
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

// Define the Risk class
export default class Risk {
    collection = 'Risks'; // Collection name
    schema = riskSchema; // Defined schema
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

    // Method to find a risk by ID
    async findById(id) {
        try {
            const risk = await this.model.findOne({ id });
            return risk;
        } catch (error) {
            console.error('Error finding risk by ID:', error);
            throw error;
        }
    }

    // Method to update a risk description
    async updateDescription(id, newDescription) {
        try {
            await this.model.findOneAndUpdate({ id }, { description: newDescription });
            console.log('Risk description updated successfully.');
        } catch (error) {
            console.error('Error updating risk description:', error);
        }
    }
}
