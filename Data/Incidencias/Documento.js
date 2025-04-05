import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import Incidencia from './Esquema.js';
import Contexto from '../Contexto.js';

const contexto = new Contexto();
const incidencia = new Incidencia();

console.log('Creating incidencia collection');
console.log('Data:', incidencia.data);


contexto.createMany(incidencia.collection, incidencia.data);



