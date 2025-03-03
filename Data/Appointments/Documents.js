import dotenv from 'dotenv';

// Load the .env file
dotenv.config({ path: '../.env' });

import Appointments from './Schema.js';
import Context from '../Context.js';

const context = new Context();
const appointments = new Appointments();

console.log('Creating appointments collection');
console.log('Data:', appointments.data);


context.createMany(appointments.collection, appointments.data);






