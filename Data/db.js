// db.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.CONNECTION_STRING_TO_DB;
    await mongoose.connect(uri);
    console.log('Conexión exitosa a MongoDB');
  } catch (err) {
    console.error('Error de conexión:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
