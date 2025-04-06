// routes/symptomRoutes.js
import express from 'express';
import Sintoma from '../../Data/Sintomas/Esquema.js';

const router = express.Router();
const sintoma = new Sintoma();

// Ruta para obtener todos los síntomas
router.get('/', async (req, res) => {
    try {
        const sintomas = await sintoma.model.find();
        res.status(200).json(sintomas);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los síntomas', error: err });
    }
});
router.get('/list', async (req, res) => {
    try {
        const sintomas = await sintoma.model.find();
        const response = sintomas.map(sintoma => ({
            value: sintoma._id,
            label: sintoma.descripcion,
            riesgo: sintoma.riesgo,
        }));
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los síntomas', error: err });
    }
});

// Ruta para obtener un síntoma por ID
router.get('/:id', async (req, res) => {
    try {
        const sintomaEncontrado = await sintoma.model.findById(req.params.id);
        if (!sintomaEncontrado) {
            return res.status(404).json({ message: 'Síntoma no encontrado' });
        }
        res.status(200).json(sintomaEncontrado);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener el síntoma', error: err });
    }
});

// Ruta para crear un nuevo síntoma
router.post('/', async (req, res) => {
    try {
        const { descripcion, riesgo } = req.body;
        const nuevoSintoma = new sintoma.model({ descripcion, riesgo });
        await nuevoSintoma.save();
        res.status(201).json({ message: 'Síntoma creado con éxito', sintoma: nuevoSintoma });
    } catch (err) {
        res.status(400).json({ message: 'Error al crear el síntoma', error: err });
    }
});

// Ruta para actualizar un síntoma por ID
router.put('/:id', async (req, res) => {
    try {
        const sintomaActualizado = await sintoma.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sintomaActualizado) {
            return res.status(404).json({ message: 'Síntoma no encontrado' });
        }
        res.status(200).json({ message: 'Síntoma actualizado', sintoma: sintomaActualizado });
    } catch (err) {
        res.status(400).json({ message: 'Error al actualizar el síntoma', error: err });
    }
});

// Ruta para eliminar un síntoma por ID
router.delete('/:id', async (req, res) => {
    try {
        const sintomaEliminado = await sintoma.model.findByIdAndDelete(req.params.id);
        if (!sintomaEliminado) {
            return res.status(404).json({ message: 'Síntoma no encontrado' });
        }
        res.status(200).json({ message: 'Síntoma eliminado', sintoma: sintomaEliminado });
    } catch (err) {
        res.status(400).json({ message: 'Error al eliminar el síntoma', error: err });
    }
});

export default router;