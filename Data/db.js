// db.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

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

export default connectDB;
