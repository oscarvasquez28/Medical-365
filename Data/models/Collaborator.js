const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Asegúrate de importar bcryptjs

// Definimos el esquema del modelo
const collaboratorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['admin', 'user'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  status: {
    type: Number,
    min: 0
  },
  creatingDate: {
    type: Date,
    default: Date.now
  },
  updatingDate: {
    type: Date,
    default: new Date('1970-01-01')
  },
  deletionDate: {
    type: Date,
    default: new Date('1970-01-01')
  },
  age: {
    type: Number,
    min: 0
  },
  active: {
    type: Number,
    default: 1
  }
});

// Middleware para encriptar la contraseña antes de guardar
collaboratorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Solo encriptar si la contraseña ha sido modificada

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Contraseña encriptada:', this.password); // Imprimir la contraseña encriptada
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar las contraseñas (compara la contraseña ingresada con la encriptada)
collaboratorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  // Compara las contraseñas
};

// Creamos el modelo con el esquema
const Collaborator = mongoose.model('Collaborator', collaboratorSchema);

module.exports = Collaborator;
