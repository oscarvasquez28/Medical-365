import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import Symptom from './Schema.js';
import Context from '../Context.js';

const context = new Context();
const symptoms = new Symptom();

console.log('Creating symptoms collection');
console.log('Data:', symptoms.data);


context.createMany(symptoms.collection, symptoms.data);




