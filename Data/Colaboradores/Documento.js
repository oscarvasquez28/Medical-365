import dotenv from 'dotenv';
// Load the .env file
var result = dotenv.config({ path: 'Server/.env' });

import Colaborator from './Esquema.js';
import Contexto from '../Contexto.js';

const contexto = new Contexto();
const colaborators = new Colaborator();

console.log('Creating colaborators collection');
console.log('Data:', colaborators.data);
    

contexto.createMany(colaborators.collection, colaborators.data);








