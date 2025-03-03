import mongoose from "mongoose";
import DummyData from './DummyData.js'; //

// Define the schema
const departamentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID is required'],
        unique: true // Ensure the ID is unique
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    creatingDate: {
        type: Date,
        default: Date.now,
        required: [true, 'Creating date is required']
    },
    updatingDate: {
        type: Date,
        default: null // No default value, optional field
    },
    deletionDate: {
        type: Date,
        default: null // No default value, optional field
    }
});

// Define the Departamento class
export default class Departament {
    collection = 'Departamento'; // Collection name
    schema = departamentSchema; // Defined schema
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

    // Method to update a departamento description
    async updateDescription(id, newDescription) {
        try {
            await this.model.findOneAndUpdate(
                { id }, 
                { 
                    description: newDescription, 
                    updatingDate: Date.now() // Automatically set the updating date
                }
            );
            console.log('Departamento description updated successfully.');
        } catch (error) {
            console.error('Error updating departamento description:', error);
        }
    }
}
