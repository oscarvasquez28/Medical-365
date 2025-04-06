// routes/departmentRoutes.js
import express from 'express';
import Departments from '../../Data/Departmentos/Esquema.js'; // Importa el modelo Department

const router = express.Router();
const Department = new Departments();

// Ruta para crear un nuevo departamento
router.post('/', async (req, res) => {
  try {
    const { id, descripcion, fechaCreacion, fechaActualizacion, fechaEliminacion } = req.body;

    // Crea un nuevo departamento
    const newDepartment = new Department.model({
      id,
      descripcion,
      fechaCreacion,
      fechaActualizacion,
      fechaEliminacion,
    });

    // Guarda el departamento en la base de datos
    await newDepartment.save();
    res.status(201).json({ message: 'Departamento creado con éxito', department: newDepartment });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear el departamento', error: err });
  }
});

// Ruta para obtener todos los departamentos
router.get('/', async (req, res) => {
  try {
    const departments = await Department.model.find(); // Obtiene todos los departamentos
    res.status(200).json(departments);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los departamentos', error: err });
  }
});
router.get('/list', async (req, res) => {
  try {
    const departments = await Department.model.find(); // Obtiene todos los departamentos
    const response = departments.map(department => ({
      value: department._id,
      label: department.descripcion
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los departamentos', error: err });
  }
});

// Ruta para obtener un departamento por ID
router.get('/department/:id', async (req, res) => {
  try {
    const department = await Department.model.findById(req.params.id); // Busca un departamento por ID
    if (!department) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.status(200).json(department);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener el departamento', error: err });
  }
});

// Ruta para actualizar un departamento por ID
router.put('/department/:id', async (req, res) => {
  try {
    const updatedDepartment = await Department.model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Devuelve el documento actualizado
    );
    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.status(200).json({ message: 'Departamento actualizado', department: updatedDepartment });
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar el departamento', error: err });
  }
});

// Ruta para eliminar un departamento por ID
router.delete('/department/:id', async (req, res) => {
  try {
    const deletedDepartment = await Department.model.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.status(200).json({ message: 'Departamento eliminado', department: deletedDepartment });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar el departamento', error: err });
  }
});

export default router;