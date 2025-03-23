import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import Sintoma from './Esquema.js';
import Contexto from '../Contexto.js';

const contexto = new Contexto();
const sintoma = new Sintoma();

console.log('Creating sintoma collection');
console.log('Data:', sintoma.data);


contexto.createMany(sintoma.collection, sintoma.data);






