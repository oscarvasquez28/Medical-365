const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Importamos axios
const connectDB = require('./db');
const collaboratorRoutes = require('./routes/collaboratorRoutes');

const app = express();

// Middleware para habilitar CORS y parsear JSON
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Usar las rutas de colaboradores
app.use('/api/collaborators', collaboratorRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
