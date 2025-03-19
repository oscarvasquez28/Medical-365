// routes/appointmentRoutes.js
import express from 'express';
import Appointments from '../../Data/Citas/Esquema.js'; // Importa el modelo Citas

const router = express.Router();
const Appointment = new Appointments();

router.get('/', async (req, res) => {
  try {
    // Obtener todas las citas
    const appointments = await Appointment.model.find();

    // Responder con las citas encontradas
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener las citas', error: err });
  }
});

// Ruta para crear una cita
router.post('/', async (req, res) => {
  try {
    const { paciente, doctor, riesgo, descripcion, fechaCita, ultimoUsuarioEnModificar, estatus } = req.body;

    // Crear una nueva cita con los datos recibidos
    const newAppointment = new Appointment.model({
      paciente,
      doctor,
      riesgo,
      descripcion,
      fechaCita,
      ultimoUsuarioEnModificar,
      estatus,
    });

    // Guardar la nueva cita en la base de datos
    await newAppointment.save();

    // Responder con un mensaje de éxito y la cita creada
    res.status(201).json({ message: 'Cita creada con éxito', appointment: newAppointment });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear la cita', error: err });
  }
});

// Ruta para obtener una cita por folio
router.get('/appointment/:folio', async (req, res) => {
  try {
    const { folio } = req.params; // Obtiene el folio desde los parámetros de la URL

    // Buscar la cita por folio
    const appointment = await Appointment.model.findOne({ folio });

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    // Responder con la cita encontrada
    res.status(200).json(appointment);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener la cita', error: err });
  }
});

export default router;
