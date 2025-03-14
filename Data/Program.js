
require('dotenv').config();

const Context = require('./Context.js');
const Colaborator = require('./Colaborators/Schema.js');

const context = new Context();

//Collections
const colaboratorCollection = new Colaborator();

// const ticketsCollection = new Colaborator();
// const appointmentsCollection = new Colaborator();
// const indicatorsCollection = new Colaborator();
// const symptomsCollection = new Colaborator();
// const toolingsCollection = new Colaborator();

context.setUpSchema(collection.model, collection.schema);
context.create(collection.collection, data)


