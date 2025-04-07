import mongoose from "mongoose";
import DatosDummy from './DatosDummy.js'; //

// Define the schema
const ticketSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Name is required']
    },
    paciente: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Colaborator
        ref: 'Colaboradores',
        required: [true, 'Patient ID is required']
    },
    sintomas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sintomas' // Reference to the Sintoma model
        }
    ],
    incidencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Incidencia', // Reference to the Incidencia model
        required: [true, 'Incidencia is required']
    },
    riesgo: {
        type: String,
        enum: ['Bajo', 'Medio', 'Alto']
    },
    fechaCreacion: {
        type: Date,
        default: Date.now(),
        required: [true, 'Creation date is required']
    },
    fechaCierre: {
        type: Date,
        default: null // No default value, optional field
    },
    // resultado: { //Se agrega dentro de cita
    //     type: String,
    //     default: null // No default value, optional field
    // },
    comentarios: {
        type: String,
        required: [true, 'comentarios are required']
    },
    estatus: {
        type: String,
        enum: ['Pendiente', 'Cerrado', 'Cancelado'],
        required: true,
        default: 'pendiente'
    }
});

// Define the Ticket class
export default class Ticket {
    collection = 'Tickets'; // Collection name
    schema = ticketSchema; // Defined schema
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

    // Method to find tickets by riesgo level
    async findByriesgo(riesgo) {
        try {
            const tickets = await this.model.find({ riesgo });
            return tickets;
        } catch (error) {
            console.error('Error finding tickets by riesgo:', error);
            throw error;
        }
    }

    // Method to close a ticket
    async closeTicket(id, resultado) {
        try {
            await this.model.findByIdAndUpdate(id, { 
                closingDate: Date.now(), 
                resultado: resultado 
            });
            console.log('Ticket closed successfully.');
        } catch (error) {
            console.error('Error closing ticket:', error);
        }
    }
}
