import mongoose from "mongoose";
import DummyData from './DummyData.js'; //

// Define the schema
const ticketStatusSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID is required'],
        unique: true // Ensure the ID is unique
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    lastUpdate: {
        type: String, // Stored as a string (you can use Date if preferred)
        default: null // No default value, optional field
    },
    whoModify: {
        type: Number,
        default: null // No default value, optional field
    }
});

// Define the TicketStatus class
export default class TicketStatus {
    collection = 'TicketStatus'; // Collection name
    schema = ticketStatusSchema; // Defined schema
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

    // Method to find a ticket status by ID
    async findById(id) {
        try {
            const ticketStatus = await this.model.findOne({ id });
            return ticketStatus;
        } catch (error) {
            console.error('Error finding ticket status by ID:', error);
            throw error;
        }
    }

    // Method to update a ticket status
    async updateTicketStatus(id, newData) {
        try {
            await this.model.findOneAndUpdate(
                { id }, 
                { 
                    ...newData, 
                    lastUpdate: new Date().toISOString() // Automatically set the last update timestamp
                }
            );
            console.log('Ticket status updated successfully.');
        } catch (error) {
            console.error('Error updating ticket status:', error);
        }
    }
}

