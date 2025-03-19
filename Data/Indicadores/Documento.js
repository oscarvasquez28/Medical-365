import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import Indicator from './Esquema.js';
import Contexto from '../Contexto.js';

const contexto = new Contexto();
const indicator = new Indicator();

console.log('Creating indicator collection');
console.log('Data:', indicator.data);


contexto.createMany(indicator.collection, indicator.data);






