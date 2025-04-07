// routes/appointmentRoutes.js
import express from 'express';
import Appointments from '../../Data/Citas/Esquema.js'; // Importa el modelo Citas

const router = express.Router();
const Appointment = new Appointments();

router.get('/', async (req, res) => {
  try {
    // Obtener todas las citas
    const appointments = await Appointment.model.find();
    const response = appointments.map(appointment => ({
      id: appointment._id,
      Ticket: appointment.ticket,
      Doctor: appointment.doctor,
      Riesgo: appointment.riesgo,
      Diagnostico: appointment.diagnostico,
      FechaCita: appointment.fechaCita,
      UltimoUsuarioEnModificar: appointment.ultimoUsuarioEnModificar,
      Estatus: appointment.estatus,
    }));
    // Responder con las citas encontradas
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener las citas', error: err });
  }
});

router.get('/risks/list', async (req, res) => {
  try {
    const response = Appointment.model.schema.path('riesgo').enumValues.map(value => ({
      value: value,
      label: value
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los colaboradores', error: err });
  }
});

// Ruta para crear una cita
router.post('/', async (req, res) => {
  try {
    const { ticket, doctor, risk, appointmentDate, lastModifiedBy, status } = req.body;

    // Crear una nueva cita con los datos recibidos
    const newAppointment = new Appointment.model({
      ticket: ticket,
      doctor: doctor,
      riesgo: risk,
      fechaCita: appointmentDate,
      ultimoUsuarioEnModificar: lastModifiedBy,
      estatus: status || 'Pendiente',
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

router.put('/:id', async (req, res) => {
  try {
    const { ticket, doctor, risk, diagnosis, appointmentDate, lastModifiedBy, status } = req.body;

    // Actualizar la cita por ID
    const updatedAppointment = await Appointment.model.findByIdAndUpdate(
      req.params.id,
      {
        ...(ticket && { ticket: ticket }),
        ...(doctor && { doctor: doctor }),
        ...(risk && { riesgo: risk }),
        ...(appointmentDate && { fechaCita: appointmentDate }),
        ...(lastModifiedBy && { ultimoUsuarioEnModificar: lastModifiedBy }),
        ...(status && { estatus: status }),
        ...(diagnostico && { diagnostico: diagnosis }),
        fechaActualizacion: Date.now(), // Actualizar la fecha de modificación
      },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    // Responder con la cita actualizada
    res.status(200).json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar la cita', error: err });
  }
});

export default router;
