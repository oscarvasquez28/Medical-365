// routes/collaboratorRoutes.js
import express from 'express';
import Collaborators from '../../Data/Colaboradores/Esquema.js'; // Importa el modelo Collaborator
import jwt from 'jsonwebtoken';

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
      { id: collaborator._id, email: collaborator.email },
      'your_jwt_secret', // Cambia por una clave secreta segura
      { expiresIn: '1h' } // El token expirará en 1 hora
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
router.post('/', async (req, res) => {
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

router.get('/status/list', async (_, res) => {
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

router.get('/roles/list', async (_, res) => {
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

router.get('/genders/list', async (_, res) => {
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

router.get('/', async (req, res) => {
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

router.get('/admin', async (req, res) => {
  try {
    const collaborators = await Collaborator.model.find(
      { rol: 'admin' } // Filtra por rol de administrador
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
router.get('/admin/list', async (req, res) => {
  try {
    const collaborators = await Collaborator.model.find(
      { rol: 'admin' } // Filtra por rol de administrador
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

router.get('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  try {
    console.log(req.body);
    const { name, lastName, password, role, email, gender, status, birthDate, department, active } = req.body;

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
        ...(active !== undefined && { activo: active })
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

router.delete('/collaborator/:id', async (req, res) => {
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