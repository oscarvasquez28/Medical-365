import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import Risk from './Schema.js';
import Context from '../Context.js';

const context = new Context();
const risks = new Risk();

console.log('Creating risks collection');
console.log('Data:', risks.data);


context.createMany(risks.collection, risks.data);





