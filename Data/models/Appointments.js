const mongoose = require('mongoose');

// Definimos el esquema para las citas (appointments)
const appointmentSchema = new mongoose.Schema({
  folio: {
    type: Number,
    required: true
  },
  patient: {
    type: Number,
    required: true
  },
  doctor: {
    type: Number,
    required: true
  },
  risk: {
    type: String,
    enum: ['bajo', 'medio', 'alto'],
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: false
  },
  creatingDate: {
    type: Date,
    default: Date.now()
  },
  updatingDate: {
    type: Date,
    default: new Date('1970-01-01')
  },
  deletionDate: {
    type: Date,
    default: new Date('1970-01-01')
  },
  lastColaboratorWhoModify: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'cerrado', 'cancelado'],
  }
});

// Middleware para generar el folio antes de guardar
appointmentSchema.pre('save', function (next) {
  // Si el folio no está definido, asignar un valor predeterminado (por ejemplo, 1000)
  if (!this.folio) {
    // Aquí puedes definir cómo se genera el folio; por ejemplo, concatenando el ID del paciente y doctor.
    this.folio = Number(`${this.patient}${this.doctor}`);
  }
  next();
});

// Creamos el modelo con el esquema
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Exportamos el modelo
module.exports = Appointment;
