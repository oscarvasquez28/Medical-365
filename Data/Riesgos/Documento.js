import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import Riesgo from './Esquema.js';
import Contexto from '../Contexto.js';

const contexto = new Contexto();
const riesgos = new Riesgo();

console.log('Creating riesgos collection');
console.log('Data:', riesgos.data);


contexto.createMany(riesgos.collection, riesgos.data);





