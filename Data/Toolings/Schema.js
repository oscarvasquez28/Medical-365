const mongoose = require("mongoose");

// Define the schema
const toolingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    version: {
        type: String,
        required: [true, 'Version is required']
    },
    description: {
        type: String,
        default: '' // Optional field, default is an empty string
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
    },
    lastColaboratorWhoModified: {
        type: Number,
        default: null // No default value, optional field
    }
});

// Define the Tooling class
export default class Tooling {
    collection = 'Toolings'; // Collection name
    schema = toolingSchema; // Defined schema
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

    // Method to find toolings by name
    async findByName(name) {
        try {
            const toolings = await this.model.find({ name });
            return toolings;
        } catch (error) {
            console.error('Error finding toolings by name:', error);
            throw error;
        }
    }

    // Method to update a tooling
    async updateTooling(id, newData) {
        try {
            await this.model.findByIdAndUpdate(id, { 
                ...newData, 
                updatingDate: Date.now() // Automatically set the updating date
            });
            console.log('Tooling updated successfully.');
        } catch (error) {
            console.error('Error updating tooling:', error);
        }
    }
}

