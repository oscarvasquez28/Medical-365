import dotenv from 'dotenv';

// Load the .env file
dotenv.config({ path: '../.env' });

import Citas from './Esquema.js';
import Contexto from '../Contexto.js';

const contexto = new Contexto();
const appointments = new Citas();

console.log('Creating appointments collection');
console.log('Data:', appointments.data);


contexto.createMany(appointments.collection, appointments.data);






