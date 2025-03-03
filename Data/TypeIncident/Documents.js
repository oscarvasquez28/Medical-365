import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import TypeIncident from './Schema.js';
import Context from '../Context.js';

const context = new Context();
const types = new TypeIncident();

console.log('Creating types collection');
console.log('Data:', types.data);


context.createMany(types.collection, types.data);



