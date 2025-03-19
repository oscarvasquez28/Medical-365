import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios'; // Importamos axios
import Context from '../../Data/Context.js';
import collaboratorRoutes from '../routes/collaboratorRoutes.js';
import appointmentRoutes from '../routes/appointmentRoutes.js';

// Configurar variables de entorno
const result = dotenv.config( {path: 'Server/.env'} );

if (result.error) {
    throw "\nThere was an error setting up environtment variables\n" + result.error;
}

const app = express();

// Middleware para habilitar CORS y parsear JSON
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
const context = new Context();

// Usar las rutas de colaboradores
app.use('/api/collaborators', collaboratorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
