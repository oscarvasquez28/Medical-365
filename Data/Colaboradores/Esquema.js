import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import DatosDummy from './DatosDummy.js'; //

// Define the schema
const collaboratorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Name is required']
    },
    apellido: {
        type: String,
        required: [true, 'Lastname is required']
    },
    contrasena: {
        type: String,
        required: [true, 'Password is required'],
        // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, 'Password must contain at least one digit, one lowercase and one uppercase letter and must be between 6 and 20 characters']
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        required: [true, 'Rol is required']
    },
    correo: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    contraseña: {   
        type: String,
        required: [true, 'Password is required'],
        match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
                'Password must be at least 8 characters long and include at least one letter, one number, and one special character']
    },    
    genero: {
        type: String,
        enum: ['Hombre', 'Mujer'],
        required: [true, 'Gender is required']
    },
    estatus: {
        type: Number,
        min: [0, 'estatus cannot be less than 0'],
        required: [true, 'estatus is required']
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
        required: [true, 'Creating date is required']
    },
    fechaActualizacion: {
        type: Date,
        default: null // Use null instead of a default date
    },
    fechaEliminacion: {
        type: Date,
        default: null // Use null instead of a default date
    },
    fechaNaciemiento: {
        type: Date,
        default: null // Use null instead of a default date
    },
    departamento: {
        type: Number,
        default: null // Use null instead of a default date
    },
    activo: {
        type: Number,
        default: 1 // Default value for "activo"
    }
});

// Middleware para encriptar la contraseña antes de guardar
collaboratorSchema.pre('save', async function (next) {
    if (!this.isModified('contrasena')) return next(); // Solo encriptar si la contraseña ha sido modificada
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.contrasena = await bcrypt.hash(this.contrasena, salt);
      console.log('Contraseña encriptada:', this.contrasena); // Imprimir la contraseña encriptada
      next();
    } catch (error) {
      next(error);
    }
});

// Método para comparar las contraseñas (compara la contraseña ingresada con la encriptada)
collaboratorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.contrasena);  // Compara las contraseñas
};

// Define the Colaborator class
export default class Colaborator {
    collection = 'Colaboradores'; // Collection name
    schema = collaboratorSchema; // Defined schema
    model = mongoose.model(this.collection, this.schema);
    data = DatosDummy; // Mongoose model

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
    async updatefechaActualizacion(id) {
        try {
            await this.model.findByIdAndUpdate(id, { fechaActualizacion: Date.now() });
            console.log('Updating date updated successfully.');
        } catch (error) {
            console.error('Error updating updating date:', error);
        }
    }
}

