// routes/indicatorRoutes.js
import express from 'express';
import Indicador from '../../Data/Indicadores/Esquema.js'; // Importa el modelo Indicador
import Ticket from '../../Data/Tickets/Esquema.js'; // Importa el modelo Ticket
// routes/indicatorRoutes.js
const router = express.Router();
const indicador = new Indicador();
const ticket = new Ticket();

// Ruta para obtener todos los indicadores
router.get('/tickets', async (req, res) => {
    try {

        const tickets = await ticket.model.find();
        
        const indicadores = {
            'total': tickets.length,
            'cerrados': tickets.filter(ticket => ticket.estatus === 'Cerrado').length,
            'pendientes': tickets.filter(ticket => ticket.estatus === 'Pendiente').length,
            'cancelados': tickets.filter(ticket => ticket.estatus === 'Cancelado').length,
            'urgentes': tickets.filter(ticket => ticket.riesgo === 'Alto').length,
        }

        // Obtiene todos los indicadores
        res.status(200).json(indicadores);

    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los indicadores', error: err });
    }
});

// Ruta para obtener un indicador por ID
router.get('/:id', async (req, res) => {
    try {
        const indicador = await indicador.model.findById(req.params.id); // Busca un indicador por ID
        if (!indicador) {
            return res.status(404).json({ message: 'Indicador no encontrado' });
        }
        res.status(200).json(indicador);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener el indicador', error: err });
    }
});

// Ruta para crear un nuevo indicador
router.post('/', async (req, res) => {
    try {
        const { id, descripcion } = req.body;

        // Crea un nuevo indicador
        const newIndicador = new indicador.model({
            id,
            descripcion,
        });

        // Guarda el indicador en la base de datos
        await newIndicador.save();
        res.status(201).json({ message: 'Indicador creado con éxito', indicador: newIndicador });
    } catch (err) {
        res.status(400).json({ message: 'Error al crear el indicador', error: err });
    }
});

// Ruta para actualizar un indicador por ID
router.put('/:id', async (req, res) => {
    try {
        const updatedIndicador = await indicador.model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Devuelve el documento actualizado
        );
        if (!updatedIndicador) {
            return res.status(404).json({ message: 'Indicador no encontrado' });
        }
        res.status(200).json({ message: 'Indicador actualizado', indicador: updatedIndicador });
    } catch (err) {
        res.status(400).json({ message: 'Error al actualizar el indicador', error: err });
    }
});

// Ruta para eliminar un indicador por ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedIndicador = await indicador.model.findByIdAndDelete(req.params.id);
        if (!deletedIndicador) {
            return res.status(404).json({ message: 'Indicador no encontrado' });
        }
        res.status(200).json({ message: 'Indicador eliminado', indicador: deletedIndicador });
    } catch (err) {
        res.status(400).json({ message: 'Error al eliminar el indicador', error: err });
    }
});

export default router;

