import mongoose from "mongoose";
import DummyData from './DummyData.js'; //

// Define the schema
const ticketSchema = new mongoose.Schema({
    patient: {
        type: Number,
        required: [true, 'Patient ID is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    symptoms: {
        type: [String], // Array of strings
        required: [true, 'Symptoms are required']
    },
    typeIncident: {
        type: String,
        required: [true, 'Description is required']
    },
    risk: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: [true, 'Risk level is required']
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: [true, 'Creation date is required']
    },
    closingDate: {
        type: Date,
        default: null // No default value, optional field
    },
    result: {
        type: String,
        default: null // No default value, optional field
    },
    comments: {
        type: String,
        required: [true, 'Comments are required']
    }
});

// Define the Ticket class
export default class Ticket {
    collection = 'Tickets'; // Collection name
    schema = ticketSchema; // Defined schema
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

    // Method to find tickets by risk level
    async findByRisk(risk) {
        try {
            const tickets = await this.model.find({ risk });
            return tickets;
        } catch (error) {
            console.error('Error finding tickets by risk:', error);
            throw error;
        }
    }

    // Method to close a ticket
    async closeTicket(id, result) {
        try {
            await this.model.findByIdAndUpdate(id, { 
                closingDate: Date.now(), 
                result: result 
            });
            console.log('Ticket closed successfully.');
        } catch (error) {
            console.error('Error closing ticket:', error);
        }
    }
}
