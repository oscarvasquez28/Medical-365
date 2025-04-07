// routes/ticketRoutes.js
import express from 'express';
import Ticket from '../../Data/Tickets/Esquema.js';
import Colaborator from '../../Data/Colaboradores/Esquema.js';
const router = express.Router();
const ticket = new Ticket();
const paciente = new Colaborator(); // Asumiendo que tienes un modelo de paciente similar

// Ruta para obtener todos los tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await ticket.model.find().populate({path: 'paciente', select: 'nombre'});
        const response = tickets.map(ticket => ({
            id: ticket._id,
            nombre: ticket.nombre,
            paciente: ticket.paciente?.nombre, // Send paciente's name
            sintomas: ticket.sintomas,
            incidencia: ticket.incidencia,
            riesgo: ticket.riesgo,
            comentarios: ticket.comentarios,
            fechaDeRegistro: ticket.fechaCreacion,
            fechaDeCierre: ticket.fechaCierre,
            estatus: ticket.estatus
        }));
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los tickets', error: err });
    }
});

// Ruta para obtener todos los tickets en formato value-label
router.get('/list', async (req, res) => {
    try {
        const tickets = await ticket.model.find();
        const response = tickets.map(ticket => ({
            value: ticket._id,
            label: ticket.nombre,
        }));
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los tickets', error: err });
    }
});

// Ruta para obtener un ticket por ID
router.get('/:id', async (req, res) => {
    try {
        const ticketById = await ticket.model.findById(req.params.id).populate({path: 'paciente', select: 'nombre'});;
        const response = {
            id: ticketById._id,
            nombre: ticketById.nombre,
            paciente: ticketById.paciente?.nombre,
            sintomas: ticketById.sintomas,
            incidencia: ticketById.incidencia,
            riesgo: ticketById.riesgo,
            comentarios: ticketById.comentarios,
            fechaDeRegistro: ticketById.fechaCreacion,
            fechaDeCierre: ticketById.fechaCierre,
            estatus: ticketById.estatus
        };

        if (!ticketById) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }

        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener el ticket', error: err });
    }
});

router.get('/status/list', async (_, res) => {
    try {
      const response = ticket.model.schema.path('estatus').enumValues.map(value => ({
        value: value,
        label: value
      }));
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ message: 'Error al obtener los colaboradores', error: err });
    }
});

// Ruta para crear un nuevo ticket
router.post('/', async (req, res) => {
    try {
        const { name, patient, symptoms, incidence, risk, comments, closeDate, estatus } = req.body;

        const newTicket = new ticket.model({
            nombre: name,
            paciente: patient,
            sintomas: symptoms,
            incidencia: incidence,
            riesgo: risk || null,
            comentarios: comments,
            fechaCierre: closeDate || null,
            estatus: estatus || 'pendiente'
        });
        await newTicket.save();
        res.status(201).json({ message: 'Ticket creado con éxito', ticket: newTicket });
    } catch (err) {
        res.status(400).json({ message: 'Error al crear el ticket', error: err });
    }
});

// Ruta para actualizar un ticket por ID
router.put('/:id', async (req, res) => {
    try {
        const { name, patient, symptoms, incidence, risk, comments, closeDate, estatus } = req.body;

        const updatedTicket = await ticket.model.findByIdAndUpdate(
            req.params.id,
            {
                ...(name && { nombre: name }),
                ...(patient && { paciente: patient }),
                ...(symptoms && { sintomas: symptoms }),
                ...(incidence && { incidencia: incidence }),
                ...(risk !== undefined && { riesgo: risk }),
                ...(comments && { comentarios: comments }),
                ...(closeDate && { fechaCierre: closeDate }),
                ...(estatus && { estatus: estatus })
            },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.status(200).json({ message: 'Ticket actualizado', ticket: updatedTicket });
    } catch (err) {
        res.status(400).json({ message: 'Error al actualizar el ticket', error: err });
    }
});

// Ruta para eliminar un ticket por ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTicket = await ticket.model.findByIdAndDelete(req.params.id);
        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.status(200).json({ message: 'Ticket eliminado', ticket: deletedTicket });
    } catch (err) {
        res.status(400).json({ message: 'Error al eliminar el ticket', error: err });
    }
});

export default router;