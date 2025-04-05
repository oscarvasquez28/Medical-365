import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import Departamento from './Esquema.js';
import Contexto from '../Contexto.js';

const contexto = new Contexto();
const department = new Departamento();

console.log('Creating department collection');
console.log('Data:', department.data);


contexto.createMany(department.collection, department.data);




