import mongoose from "mongoose";
import DummyData from './DummyData.js'; //

// Define the schema
const colaboratorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required']
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        required: [true, 'Rol is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    gender: {
        type: String,
        enum: ['Hombre', 'Mujer'],
        required: [true, 'Gender is required']
    },
    status: {
        type: Number,
        min: [0, 'Status cannot be less than 0'],
        required: [true, 'Status is required']
    },
    creatingDate: {
        type: Date,
        default: Date.now,
        required: [true, 'Creating date is required']
    },
    updatingDate: {
        type: Date,
        default: null // Use null instead of a default date
    },
    deletionDate: {
        type: Date,
        default: null // Use null instead of a default date
    },
    age: {
        type: Number,
        min: [0, 'Age cannot be less than 0'],
        default: null // If not provided, it will be null
    },
    activo: {
        type: Number,
        default: 1 // Default value for "activo"
    }
});

// Define the Colaborator class
export default class Colaborator {
    collection = 'Collaborators'; // Collection name
    schema = colaboratorSchema; // Defined schema
    model = mongoose.model(this.collection, this.schema);
    data = DummyData; // Mongoose model

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

    // Method to find collaborators by role
    async findByRol(rol) {
        try {
            const colaborators = await this.model.find({ rol });
            return colaborators;
        } catch (error) {
            console.error('Error finding collaborators by role:', error);
            throw error;
        }
    }

    // Method to update the updating date
    async updateUpdatingDate(id) {
        try {
            await this.model.findByIdAndUpdate(id, { updatingDate: Date.now() });
            console.log('Updating date updated successfully.');
        } catch (error) {
            console.error('Error updating updating date:', error);
        }
    }
}

