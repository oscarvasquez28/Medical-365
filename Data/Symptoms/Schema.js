import mongoose from "mongoose";
import DummyData from './DummyData.js'; //


// Define the schema
const symptomSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    risk: {
        type: Number,
        required: [true, 'Risk is required'],
        min: [0, 'Risk cannot be less than 0'],
        max: [10, 'Risk cannot be greater than 10']
    }
});

// Define the Symptom class
export default class Symptom {
    collection = 'Symptoms'; // Collection name
    schema = symptomSchema; // Defined schema
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

    // Method to find symptoms by risk level
    async findByRisk(risk) {
        try {
            const symptoms = await this.model.find({ risk });
            return symptoms;
        } catch (error) {
            console.error('Error finding symptoms by risk:', error);
            throw error;
        }
    }

    // Method to update the description of a symptom
    async updateDescription(id, newDescription) {
        try {
            await this.model.findByIdAndUpdate(id, { description: newDescription });
            console.log('Description updated successfully.');
        } catch (error) {
            console.error('Error updating description:', error);
        }
    }
}
