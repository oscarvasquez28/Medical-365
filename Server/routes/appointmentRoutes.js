// routes/appointmentRoutes.js
import express from 'express';
import Appointments from '../../Data/Citas/Esquema.js'; // Importa el modelo Citas
import Tickets from '../../Data/Tickets/Esquema.js'; // Importa el modelo Tickets
import nodemailer from 'nodemailer';
import Colaborator from '../../Data/Colaboradores/Esquema.js';
import Departamento from '../../Data/Departmentos/Esquema.js';

const router = express.Router();
const Appointment = new Appointments();
const Ticket = new Tickets();

router.get('/', async (req, res) => {
  try {
    // Obtener todas las citas
    const appointmentsWithTickets = await Appointment.model
      .find()
      .populate('ticket');

    for (const appointment of appointmentsWithTickets) {

      if (global.auth === false)
        appointment.ticket = await Ticket.model.findById(appointment.ticket).populate('paciente');

      else if (req.user.rol === 'Colaborador') {
        const ticketDetails = await Ticket.model.findById(appointment.ticket).populate('paciente');
        if (ticketDetails?.paciente?._id.toString() !== req.user.id) {
          continue; // Skip appointments that do not match the user's paciente ID
        }
        appointment.ticket = ticketDetails;
      }

      else if (req.user.rol === 'Gerente') {
        const ticketDetails = await Ticket.model.findById(appointment.ticket).populate({
          path: 'paciente',
          populate: { path: 'departamento' }
        });
        if (ticketDetails?.paciente?.departamento?._id.toString() !== req.user.departamento) {
          continue; // Skip appointments that do not match the user's departamento ID
        }
        appointment.ticket = ticketDetails;
      }

      else if (appointment.ticket) {
        appointment.ticket = await Ticket.model.findById(appointment.ticket).populate('paciente');
      }

    }

    const response = appointmentsWithTickets.map(appointment => {
      return {
        id: appointment._id,
        Ticket: appointment.ticket?.nombre,
        Paciente: appointment.ticket?.paciente?.nombre,
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

router.get('/table', async (req, res) => {
  try {
    // Obtener todas las citas
    const appointmentsWithTickets = await Appointment.model
      .find()
      .populate('ticket')
      .populate({ path: 'recurso', select: 'nombre' })
      .populate({ path: 'ultimoUsuarioEnModificar', select: 'nombre' });

    for (const appointment of appointmentsWithTickets) {

      if (global.auth === false) {
        appointment.ticket = await Ticket.model.findById(appointment.ticket).populate({
          path: 'paciente',
          populate: { path: 'departamento' }
        });
      }
      else if (req.user.rol === 'Colaborador') {
        const ticketDetails = await Ticket.model.findById(appointment.ticket).populate({
          path: 'paciente',
          populate: { path: 'departamento' }
        });
        if (ticketDetails?.paciente?._id.toString() !== req.user.id) {
          continue; // Skip appointments that do not match the user's paciente ID
        }
        appointment.ticket = ticketDetails;
      }
      else if (req.user.rol === 'Gerente') {
        const ticketDetails = await Ticket.model.findById(appointment.ticket).populate({
          path: 'paciente',
          populate: { path: 'departamento' }
        });
        if (ticketDetails?.paciente?.departamento?._id.toString() !== req.user.departamento) {
          continue; // Skip appointments that do not match the user's departamento ID
        }
        appointment.ticket = ticketDetails;
      }
      else if (appointment.ticket) {
        appointment.ticket = await Ticket.model.findById(appointment.ticket).populate({
          path: 'paciente',
          populate: { path: 'departamento' }
        });
      }
    }

    const response = appointmentsWithTickets.map(appointment => {
      return {
        id: appointment._id,
        Ticket: appointment.ticket?.nombre,
        Paciente: appointment.ticket?.paciente?.nombre,
        Departamento: appointment.ticket?.paciente?.departamento?.descripcion,
        Doctor: appointment?.doctor,
        Riesgo: appointment?.riesgo,
        Recurso: appointment.recurso?.nombre,
        Diagnostico: appointment?.diagnostico,
        FechaCita: appointment?.fechaCita,
        UltimoUsuarioEnModificar: appointment.ultimoUsuarioEnModificar?.nombre,
        Estatus: appointment?.estatus,
      };
    });
    // Responder con las citas encontradas
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener las citas', error: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Obtener cita por ID
    const foundAppointment = await Appointment.model.findById(req.params.id)
      .populate('ticket');

    if (foundAppointment.ticket) {
      foundAppointment.ticket = await Ticket.model.findById(foundAppointment.ticket).populate('paciente');
    }

    if (!foundAppointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    const response = {
      id: foundAppointment._id,
      Ticket: foundAppointment.ticket?.nombre,
      Paciente: foundAppointment.ticket?.paciente?.nombre,
      Doctor: foundAppointment.doctor,
      Riesgo: foundAppointment.riesgo,
      Recurso: foundAppointment.recurso,
      Diagnostico: foundAppointment.diagnostico,
      FechaCita: foundAppointment.fechaCita,
      UltimoUsuarioEnModificar: foundAppointment.ultimoUsuarioEnModificar,
      Estatus: foundAppointment.estatus,
    };

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
      if (appointment.ticket && appointment.ticket.paciente == id) { // Filtrar por ID del paciente
        return {
          id: appointment._id,
          title: appointment.ticket?.nombre,
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

// router.get('/calendar/all', async (req, res) => {
//   try {
//     // Obtener todas las citas
//     const appointments = await Appointment.model.find().populate('ticket');
//     const response = appointments.map((appointment) => {
//       if (appointment.ticket) { // Verificar si el ticket existe
//         return {
//           id: appointment._id,
//           title: appointment.ticket?.nombre,
//           start: appointment.fechaCita,
//           end: appointment.fechaCita,
//           allDay: true,
//         };
//       }
//       return null;
//     }).filter(appointment => appointment !== null); // Filtrar las citas no nulas

//     // Responder con las citas encontradas
//     res.status(200).json(response);
//   } catch (err) {
//     res.status(400).json({ message: 'Error al obtener las citas', error: err });
//   }
// });

router.get('/status/list', async (req, res) => {
  try {
    const response = Appointment.model.schema.path('estatus').enumValues.map(value => ({
      value: value,
      label: value
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los colaboradores', error: err });
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

    // Enviar correo al paciente utilizando nodemailer
    if (ticket) {
      const ticketDetails = await Ticket.model.findById(ticket).populate('paciente');

      const updatedTicket = await Ticket.model.findByIdAndUpdate(ticket, {
        riesgo: risk || ticketDetails.riesgo,
      }, { new: true });

      if (ticketDetails && ticketDetails.paciente && ticketDetails.paciente.correo) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.BUSINESS_EMAIL,
            pass: process.env.BUSINESS_APP_PASSWORD, // Use an App Password instead of the Gmail password
          },
        });

        const correo = ticketDetails.paciente.correo;

        const mailOptions = {
          from: process.env.BUSINESS_EMAIL,
          to: correo,
          subject: 'Nueva Cita Programada',
          text: `Hola ${ticketDetails.paciente.nombre} ${ticketDetails.paciente.apellido}, tu cita ha sido programada para el ${appointmentDate}.`,
        };

        await transporter.sendMail(mailOptions);
      }
    }


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

    const updatedTicket = await Ticket.model.findByIdAndUpdate(
      ticket || updatedAppointment.ticket,
      {
        ...(risk && { riesgo: risk }),
        ...(status && { estatus: status }),
        ...(status == 'Cerrado' && { fechaCierre: Date.now() }), // Actualizar la fecha de cierre si el estatus es 'Cerrado'
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
