// routes/toolingRoutes.js
import express from 'express';
import Recursos from '../../Data/Recursos/Esquema.js';

const router = express.Router();
const Tooling = new Recursos();

// Ruta para obtener todos los toolings
router.get('/', async (req, res) => {
    try {
        const toolings = await Tooling.model.find();
        const response = toolings.map(tooling => ({
            id: tooling._id,
            Nombre: tooling.nombre,
            Version: tooling.version,
            Descripcion: tooling.descripcion,
            FechaDeRegistro: tooling.fechaCreacion,
            UltimoUsuarioEnModificar: tooling.ultimoUsuarioEnModificar,
            Estado: tooling.estatus
        }));
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los toolings', error: err });
    }
});

router.get('/list', async (req, res) => {
    try {
        const toolings = await Tooling.model.find();
        const response = toolings.map(tooling => ({
            value: tooling._id,
            label: tooling.nombre,
        }));
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los toolings', error: err });
    }
});

router.get('/status/list', async (req, res) => {
    try {
        const response = Tooling.model.schema.path('estatus').enumValues.map(value => ({
            value: value,
            label: value
        }));
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los toolings', error: err });
    }});

// Ruta para obtener un tooling por ID
router.get('/:id', async (req, res) => {
    try {
        const tooling = await Tooling.model.findById(req.params.id);
        if (!tooling) {
            return res.status(404).json({ message: 'Tooling no encontrado' });
        }
        res.status(200).json(tooling);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener el tooling', error: err });
    }
});

// Ruta para crear un nuevo tooling
router.post('/', async (req, res) => {
    try {
        const { name, version, description, lastColaboratorWhoModified } = req.body;

        const newTooling = new Tooling.model({
            nombre: name,
            version: version,
            descripcion: description,
            lastColaboratorWhoModified: lastColaboratorWhoModified,
        });

        await newTooling.save();
        res.status(201).json({ message: 'Tooling creado con éxito', tooling: newTooling });
    } catch (err) {
        res.status(400).json({ message: 'Error al crear el tooling', error: err });
    }
});

// Ruta para actualizar un tooling por ID
router.put('/:id', async (req, res) => {
    try {
        const { name, version, description, lastColaboratorWhoModified, status } = req.body;
        const updatedTooling = await Tooling.model.findByIdAndUpdate(
            req.params.id,
            {
                ...(name && { nombre: name }),
                ...(version && { version: version }),
                ...(description && { descripcion: description }),
                ...(lastColaboratorWhoModified && { ultimoUsuarioEnModificar: lastColaboratorWhoModified }),
                ...(status && { estatus: status }),
                fechaActualizacion: Date.now()
            },
            { new: true }
        );
        if (!updatedTooling) {
            return res.status(404).json({ message: 'Tooling no encontrado' });
        }
        res.status(200).json({ message: 'Tooling actualizado', tooling: updatedTooling });
    } catch (err) {
        res.status(400).json({ message: 'Error al actualizar el tooling', error: err });
    }
});

// Ruta para eliminar un tooling por ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTooling = await Tooling.model.findByIdAndDelete(req.params.id);
        if (!deletedTooling) {
            return res.status(404).json({ message: 'Tooling no encontrado' });
        }
        res.status(200).json({ message: 'Tooling eliminado', tooling: deletedTooling });
    } catch (err) {
        res.status(400).json({ message: 'Error al eliminar el tooling', error: err });
    }
});

export default router;