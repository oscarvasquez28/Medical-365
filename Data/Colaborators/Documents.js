import dotenv from 'dotenv';
// Load the .env file
dotenv.config({ path: '../.env' });

import Colaborator from './Schema.js';
import Context from '../Context.js';

const context = new Context();
const colaborators = new Colaborator();

console.log('Creating colaborators collection');
console.log('Data:', colaborators.data);
    

context.createMany(colaborators.collection, colaborators.data);








