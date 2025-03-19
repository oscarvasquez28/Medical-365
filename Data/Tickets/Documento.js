import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import Ticket from './Esquema.js';
import Contexto from '../Contexto.js';

const contexto = new Contexto();
const ticket = new Ticket();

console.log('Creating ticket collection');
console.log('Data:', ticket.data);


contexto.createMany(ticket.collection, ticket.data);






