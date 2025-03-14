import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import TicketStatus from './Schema.js';
import Context from '../Context.js';

const context = new Context();
const status = new TicketStatus();

console.log('Creating status collection');
console.log('Data:', status.data);


context.createMany(status.collection, status.data);






