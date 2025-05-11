// routes/collaboratorRoutes.js
import express from 'express';
import Collaborators from '../../Data/Colaboradores/Esquema.js'; // Importa el modelo Collaborator
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();
const Collaborator = new Collaborators();

// routes/collaboratorRoutes.js

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al colaborador por email
    const collaborator = await Collaborator.model.findOne({ correo: email });
    if (!collaborator) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar si la contraseña ingresada coincide con la encriptada en la base de datos
    const isMatch = await collaborator.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Si las credenciales son correctas, generar un token JWT
    const token = jwt.sign(
      { id: collaborator._id, correo: collaborator.correo, rol: collaborator.rol, departamento: collaborator.departamento },
      process.env.JWT_SECRET, // Cambia por una clave secreta segura
      { expiresIn: '15m' } // El token expira en 15 minutos
    );

    res.status(200).json({
      message: 'Login exitoso',
      token,
      collaborator: {
        id: collaborator._id,
        name: collaborator.nombre,
        email: collaborator.correo,
        rol: collaborator.rol,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Ruta para crear un nuevo colaborador
router.post('/', authenticateJWT, async (req, res) => {
  try {
    console.log(req.body);
    const { name, lastName, password, role, email, gender, status, birthDate, department, active } = req.body;

    // Crea un nuevo colaborador
    const newCollaborator = new Collaborator.model({
      nombre: name,
      apellido: lastName,
      contraseña: password,
      rol: role,
      correo: email,
      genero: gender,
      estatus: status,
      fechaNacimiento: birthDate,
      departamento: department,
      activo: active
    });

    // Guarda el colaborador en la base de datos
    await newCollaborator.save();
    res.status(201).json({ message: 'Colaborador creado con éxito', collaborator: newCollaborator });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear el colaborador', error: err });
  }
});

router.get('/status/list', authenticateJWT, async (_, res) => {
  try {
    const response = Collaborator.model.schema.path('estatus').enumValues.map(value => ({
      value: value,
      label: value
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los colaboradores', error: err });
  }
});

router.get('/roles/list', authenticateJWT, async (_, res) => {
  try {
    const response = Collaborator.model.schema.path('rol').enumValues.map(value => ({
      value: value,
      label: value
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los colaboradores', error: err });
  }
});

router.get('/genders/list', authenticateJWT, async (_, res) => {
  try {
    const response = Collaborator.model.schema.path('genero').enumValues.map(value => ({
      value: value,
      label: value
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los colaboradores', error: err });
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const collaborators = await Collaborator.model.find(); // Obtiene todos los colaboradores
    const response = collaborators.map(collaborator => ({
      id: collaborator._id,
      Nombre: collaborator.nombre,
      Apellido: collaborator.apellido,
      Correo: collaborator.correo,
      FechaDeNacimiento: collaborator.fechaNacimiento,
      Genero: collaborator.genero,
      Contraseña: collaborator.contraseña,
      Rol: collaborator.rol,
      Departamento: collaborator.departamento,
      FechaDeRegistro: collaborator.fechaCreacion,
      FechaDeBaja: collaborator.fechaEliminacion,
      Estado: collaborator.estatus
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los colaboradores', error: err });
  }
});

router.get('/table', authenticateJWT, async (req, res) => {
  try {
    const collaborators = await Collaborator.model
      .find()
      .populate('departamento'); // Obtiene todos los colaboradores

    const response = collaborators.map(collaborator => ({
      id: collaborator._id,
      Nombre: collaborator.nombre,
      Apellido: collaborator.apellido,
      Correo: collaborator.correo,
      FechaDeNacimiento: collaborator.fechaNacimiento,
      Genero: collaborator.genero,
      Contraseña: collaborator.contraseña,
      Rol: collaborator.rol,
      Departamento: collaborator.departamento?.descripcion || 'Sin departamento',
      FechaDeRegistro: collaborator.fechaCreacion,
      FechaDeBaja: collaborator.fechaEliminacion,
      Estado: collaborator.estatus
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los colaboradores', error: err });
  }
});

router.get('/admin', authenticateJWT, async (req, res) => {
  try {
    const collaborators = await Collaborator.model.find(
      { rol: 'Administrador' } // Filtra por rol de administrador
    );
    const response = collaborators.map(collaborator => ({
      id: collaborator._id,
      Nombre: collaborator.nombre,
      Apellido: collaborator.apellido,
      Correo: collaborator.correo,
      FechaDeRegistro: collaborator.fechaCreacion,
      FechaDeBaja: collaborator.fechaEliminacion,
      Estado: collaborator.estatus
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los colaboradores', error: err });
  }
});

// Formato value-label
router.get('/admin/list', authenticateJWT, async (req, res) => {
  try {
    const collaborators = await Collaborator.model.find(
      { rol: 'Administrador' } // Filtra por rol de administrador
    );
    const response = collaborators.map(collaborator => ({
      value: collaborator._id,
      label: `${collaborator.nombre} ${collaborator.apellido}`
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los colaboradores', error: err });
  }
});

// Formato value-label
router.get('/list', authenticateJWT, async (req, res) => {
  try {
    const collaborators = await Collaborator.model.find();
    const response = collaborators.map(collaborator => ({
      value: collaborator._id,
      label: `${collaborator.nombre} ${collaborator.apellido}`
    }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los colaboradores', error: err });
  }
});

router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const collaborator = await Collaborator.model.findById(req.params.id); // Busca un colaborador por ID
    if (collaborator) {
      const response = {
        id: collaborator._id,
        Nombre: collaborator.nombre,
        Apellido: collaborator.apellido,
        Correo: collaborator.correo,
        FechaDeNacimiento: collaborator.fechaNacimiento,
        Genero: collaborator.genero,
        Contraseña: collaborator.contraseña,
        Rol: collaborator.rol,
        Departamento: collaborator.departamento,
        FechaDeRegistro: collaborator.fechaCreacion,
        FechaDeBaja: collaborator.fechaEliminacion,
        Estado: collaborator.estatus
      };
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener el colaborador', error: err });
  }
});

router.put('/:id', authenticateJWT, async (req, res) => {
  try {
    console.log(req.body);
    const { name, lastName, password, role, email, gender, status, birthDate, department, active,  } = req.body;
    var deletionDate = ""; // Inicializa la variable de fecha de eliminación
    if (status == 'Inactivo') {
      deletionDate = Date.now(); // Establece la fecha de eliminación como la fecha actual
    }
    
    const updatedCollaborator = await Collaborator.model.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { nombre: name }),
        ...(lastName && { apellido: lastName }),
        ...(password && { contraseña: password }),
        ...(role && { rol: role }),
        ...(email && { correo: email }),
        ...(gender && { genero: gender }),
        ...(status && { estatus: status }),
        ...(birthDate && { fechaNacimiento: birthDate }),
        ...(department && { departamento: department }),
        ...(active !== undefined && { activo: active }),
        ...(deletionDate && { fechaEliminacion: deletionDate }), // Solo establece la fecha de eliminación si el estado es "Inactivo"
        fechaActualizacion: Date.now(), // Actualiza la fecha de modificación
      },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedCollaborator) {
      return res.status(404).json({ message: 'Colaborador no encontrado' });
    }

    res.status(200).json({ message: 'Colaborador actualizado', collaborator: updatedCollaborator });
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar el colaborador', error: err });
  }
});

router.put('status/:id', authenticateJWT, async (req, res) => {
  try {
    console.log(req.body);
    const { status } = req.body;

    const updatedCollaborator = await Collaborator.model.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { estatus: status }),
      },
      { new: true } // Devuelve el documento actualizado
    );
    
    if (!updatedCollaborator) {
      return res.status(404).json({ message: 'Colaborador no encontrado' });
    }

    res.status(200).json({ message: 'Colaborador actualizado', collaborator: updatedCollaborator });
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar el colaborador', error: err });
  }
});

router.delete('/collaborator/:id', authenticateJWT, async (req, res) => {
  try {
    const deletedCollaborator = await Collaborator.model.findByIdAndDelete(req.params.id);
    if (!deletedCollaborator) {
      return res.status(404).json({ message: 'Colaborador no encontrado' });
    }
    res.status(200).json({ message: 'Colaborador eliminado', collaborator: deletedCollaborator });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar el colaborador', error: err });
  }
});

export default router;