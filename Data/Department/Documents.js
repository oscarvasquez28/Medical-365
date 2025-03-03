import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import Departament from './Schema.js';
import Context from '../Context.js';

const context = new Context();
const departments = new Departament();

console.log('Creating departments collection');
console.log('Data:', departments.data);


context.createMany(departments.collection, departments.data);






