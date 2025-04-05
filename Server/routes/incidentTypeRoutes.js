// routes/indicatorRoutes.js
import express from 'express';
import Incidencia from '../../Data/Incidencias/Esquema.js';

const router = express.Router();
const incidencia = new Incidencia();

// Ruta para obtener todos los tipos de incidencias
router.get('/', async (req, res) => {
    try {
        const incidentTypes = await incidencia.model.find();
        res.status(200).json(incidentTypes);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los tipos de incidencias', error: err });
    }
});

// Ruta para obtener un tipo de incidencia por ID
router.get('/:id', async (req, res) => {
    try {
        const incidentType = await incidencia.findById(req.params.id);
        if (!incidentType) {
            return res.status(404).json({ message: 'Tipo de incidencia no encontrado' });
        }
        res.status(200).json(incidentType);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener el tipo de incidencia', error: err });
    }
});

// Ruta para crear un nuevo tipo de incidencia
router.post('/', async (req, res) => {
    try {
        const { id, descripcion } = req.body;

        // Crea un nuevo tipo de incidencia
        const newIncidentType = new incidencia.model({
            id,
            descripcion,
        });

        // Guarda el tipo de incidencia en la base de datos
        await newIncidentType.save();
        res.status(201).json({ message: 'Tipo de incidencia creado con éxito', incidentType: newIncidentType });
    } catch (err) {
        res.status(400).json({ message: 'Error al crear el tipo de incidencia', error: err });
    }
});

// Ruta para actualizar la descripcion de un tipo de incidencia
router.put('/:id', async (req, res) => {
    try {
        const { descripcion } = req.body;
        const updatedIncidentType = await incidencia.model.findOneAndUpdate(
            { id: req.params.id },
            { descripcion },
            { new: true } // Devuelve el documento actualizado
        );
        if (!updatedIncidentType) {
            return res.status(404).json({ message: 'Tipo de incidencia no encontrado' });
        }
        res.status(200).json({ message: 'Tipo de incidencia actualizado', incidentType: updatedIncidentType });
    } catch (err) {
        res.status(400).json({ message: 'Error al actualizar el tipo de incidencia', error: err });
    }
});

// Ruta para eliminar un tipo de incidencia
router.delete('/:id', async (req, res) => {
    try {
        const deletedIncidentType = await incidencia.model.findOneAndDelete({ id: req.params.id });
        if (!deletedIncidentType) {
            return res.status(404).json({ message: 'Tipo de incidencia no encontrado' });
        }
        res.status(200).json({ message: 'Tipo de incidencia eliminado', incidentType: deletedIncidentType });
    } catch (err) {
        res.status(400).json({ message: 'Error al eliminar el tipo de incidencia', error: err });
    }
});

export default router;