require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.CONNECTION_STRING_TO_DB;
const path = process.env.PATH_TO_CERTIFICATE;

//Connect to MongoDB Atlas with X.509 authentication and TLS 
mongoose.connect(uri, {
    tls: true,
    tlsCertificateKeyFile: path // Update this path to your .pem file
})
.then(() => {
    console.log('Connected to MongoDB Atlas with X.509 authentication');
})
.catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

// Definir un esquema
const ColaboradorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    edad: {
        type: Number,
        min: 0
    },
    activo: {
        type: Boolean,
        default: true
    }
});

// Crear un modelo
const Colaborador = mongoose.model('Colaborador', ColaboradorSchema);

Create()

async function Create() {
    const nuevoColaborador = new Colaborador({
        nombre: "Max Augusto",
        email: "max@example.com",
        edad: 30
    });

    // Guardar el Colaborador en la base de datos
    await nuevoColaborador.save()
        .then(() => console.log("Colaborador guardado exitosamente"))
        .catch(err => console.error("Error guardando el Colaborador:", err));
}


