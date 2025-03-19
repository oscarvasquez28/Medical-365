import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import Recursos from './Esquema.js';
import Contexto from '../Contexto.js';

const contexto = new Contexto();
const recursos = new Recursos();

console.log('Creating Recursos collection');
console.log('Data:', recursos.data);


contexto.createMany(recursos.collection, recursos.data);




