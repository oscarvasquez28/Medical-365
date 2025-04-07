import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Context from '../../Data/Contexto.js';
import collaboratorRoutes from '../routes/collaboratorRoutes.js';
import incidentTypeRoutes from '../routes/incidentTypeRoutes.js';
import appointmentRoutes from '../routes/appointmentRoutes.js';
import departmentRoutes from '../routes/departmentRoutes.js';
import indicatorRoutes from '../routes/indicatorRoutes.js';
import toolingRoutes from '../routes/toolingRoutes.js';
import symptomRoutes from '../routes/symptomRoutes.js';
import ticketRoutes from '../routes/ticketRoutes.js';
import riskRoutes from '../routes/riskRoutes.js';

// Configurar variables de entorno
const result = dotenv.config( {path: '../.env'} );

if (result.error) {
    throw "\nThere was an error setting up environtment variables\n" + result.error;
}

const app = express();

// Middleware para habilitar CORS y parsear JSON
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
const context = new Context();

// Usar las rutas de cada colección
app.use('/api/collaborators', collaboratorRoutes);
app.use('/api/incidentTypes', incidentTypeRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/indicators', indicatorRoutes);
app.use('/api/toolings', toolingRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/risks', riskRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
