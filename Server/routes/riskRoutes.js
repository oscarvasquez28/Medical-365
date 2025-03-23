// routes/toolingRoutes.js
import express from 'express';
import Riesgo from '../../Data/Riesgos/Esquema.js'; // Importa el modelo Riesgo

const router = express.Router();
const riesgo = new Riesgo();

// Ruta para obtener todos los riesgos
router.get('/', async (req, res) => {
    try {
        const riesgos = await riesgo.model.find(); // Obtiene todos los riesgos
        res.status(200).json(riesgos);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los riesgos', error: err });
    }
});

// Ruta para obtener un riesgo por ID
router.get('/:id', async (req, res) => {
    try {
        const riesgoEncontrado = await riesgo.findById(req.params.id); // Busca un riesgo por ID
        if (!riesgoEncontrado) {
            return res.status(404).json({ message: 'Riesgo no encontrado' });
        }
        res.status(200).json(riesgoEncontrado);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener el riesgo', error: err });
    }
});

// Ruta para crear un nuevo riesgo
router.post('/', async (req, res) => {
    try {
        const { id, descripcion } = req.body;

        // Crea un nuevo riesgo
        const nuevoRiesgo = new riesgo.model({
            id,
            descripcion,
        });

        // Guarda el riesgo en la base de datos
        await nuevoRiesgo.save();
        res.status(201).json({ message: 'Riesgo creado con éxito', riesgo: nuevoRiesgo });
    } catch (err) {
        res.status(400).json({ message: 'Error al crear el riesgo', error: err });
    }
});

// Ruta para actualizar un riesgo por ID
router.put('/:id', async (req, res) => {
    try {
        const { descripcion } = req.body;
        const riesgoActualizado = await riesgo.model.findOneAndUpdate(
            { id: req.params.id },
            { descripcion },
            { new: true } // Devuelve el documento actualizado
        );
        if (!riesgoActualizado) {
            return res.status(404).json({ message: 'Riesgo no encontrado' });
        }
        res.status(200).json({ message: 'Riesgo actualizado', riesgo: riesgoActualizado });
    } catch (err) {
        res.status(400).json({ message: 'Error al actualizar el riesgo', error: err });
    }
});

// Ruta para eliminar un riesgo por ID
router.delete('/:id', async (req, res) => {
    try {
        const riesgoEliminado = await riesgo.model.findOneAndDelete({ id: req.params.id });
        if (!riesgoEliminado) {
            return res.status(404).json({ message: 'Riesgo no encontrado' });
        }
        res.status(200).json({ message: 'Riesgo eliminado', riesgo: riesgoEliminado });
    } catch (err) {
        res.status(400).json({ message: 'Error al eliminar el riesgo', error: err });
    }
});

export default router;