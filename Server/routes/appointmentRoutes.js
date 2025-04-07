// routes/appointmentRoutes.js
import express from 'express';
import Appointments from '../../Data/Citas/Esquema.js'; // Importa el modelo Citas

const router = express.Router();
const Appointment = new Appointments();

router.get('/', async (req, res) => {
  try {
    // Obtener todas las citas
    const appointmentsWithTickets = await Appointment.model.find().populate('ticket');
    const response = appointmentsWithTickets.map(appointment => {
        return {
          id: appointment._id,
          Ticket: appointment.ticket?.nombre,
          Doctor: appointment.doctor,
          Riesgo: appointment.riesgo,
          Recurso: appointment.recurso,
          Diagnostico: appointment.diagnostico,
          FechaCita: appointment.fechaCita,
          UltimoUsuarioEnModificar: appointment.ultimoUsuarioEnModificar,
          Estatus: appointment.estatus,
        };
    });
    // Responder con las citas encontradas
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener las citas', error: err });
  }
});

router.get('/calendar/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del paciente desde los parámetros de la URL

    // Obtener todas las citas
    const appointments = await Appointment.model.find().populate('ticket');
    const response = appointments.map((appointment) => {
        if (appointment.ticket && appointment.ticket.paciente === id) { // Filtrar por ID del paciente
          return {
            id: appointment._id,
            title: appointment.ticket.nombre,
            start: appointment.fechaCita,
            end: appointment.fechaCita,
            allDay: true,
          };
        }
        return null;
    }).filter(appointment => appointment !== null); // Filtrar las citas no nulas

    // Filtrar las citas no nulas
    const filteredResponse = response.filter(appointment => appointment !== null);

    // Responder con las citas encontradas
    res.status(200).json(filteredResponse);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener las citas', error: err });
  }
});

router.get('/calendar', async (req, res) => {
  try {
    // Obtener todas las citas
    const appointments = await Appointment.model.find().populate('ticket');
    const response = appointments.map((appointment) => {
      if (appointment.ticket) { // Verificar si el ticket existe
        return {
          id: appointment._id,
          title: appointment.ticket.nombre,
          start: appointment.fechaCita,
          end: appointment.fechaCita,
          allDay: true,
        };
      }
      return null;
    }).filter(appointment => appointment !== null); // Filtrar las citas no nulas

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
    const { ticket, doctor, risk, tooling, diagnosis, appointmentDate, lastModifiedBy, status } = req.body;

    // Actualizar la cita por ID
    const updatedTicket = await Tickets.model.findByIdAndUpdate(
      ticket,
      {
        ...(status && { estatus: status }),
        ...(status == 'Cerrado' && { fechaCierre: Date.now() }), // Actualizar la fecha de cierre si el estatus es 'Cerrado'
      },
      { new: true } // Devuelve el documento actualizado
    );
    const updatedAppointment = await Appointment.model.findByIdAndUpdate(
      req.params.id,
      {
        ...(ticket && { ticket: ticket }),
        ...(doctor && { doctor: doctor }),
        ...(risk && { riesgo: risk }),
        ...(tooling && { recurso: tooling }),
        ...(appointmentDate && { fechaCita: appointmentDate }),
        ...(lastModifiedBy && { ultimoUsuarioEnModificar: lastModifiedBy }),
        ...(status && { estatus: status }),
        ...(status == 'Cerrado' && { fechaEliminacion: Date.now() }), // Actualizar la fecha de eliminación si el estatus es 'Cerrado'
        ...(diagnosis && { diagnostico: diagnosis }),
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
