import dotenv from 'dotenv'
// Load the .env file
dotenv.config({ path: '../.env' });

import Indicator from './Schema.js';
import Context from '../Context.js';

const context = new Context();
const indicators = new Indicator();

console.log('Creating indicators collection');
console.log('Data:', indicators.data);


context.createMany(indicators.collection, indicators.data);






