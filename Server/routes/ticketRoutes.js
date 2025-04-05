// routes/ticketRoutes.js
import express from 'express';
import Ticket from '../../Data/Tickets/Esquema.js';
const router = express.Router();
const ticket = new Ticket();

// Ruta para obtener todos los tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await ticket.model.find();
        res.status(200).json(tickets);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los tickets', error: err });
    }
});

// Ruta para obtener un ticket por ID
router.get('/:id', async (req, res) => {
    try {
        const ticketById = await ticket.model.findById(req.params.id);
        if (!ticketById) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.status(200).json(ticketById);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener el ticket', error: err });
    }
});

// Ruta para crear un nuevo ticket
router.post('/', async (req, res) => {
    try {
        const { patient, description, symptoms, incidence, risk, result, comments } = req.body;

        const newTicket = new ticket.model({
            paciente: patient,
            descripcion: description,
            sintomas: symptoms,
            incidencia: incidence,
            riesgo: risk,
            resultado: result,
            comentarios: comments
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
        const updatedTicket = await ticket.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
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