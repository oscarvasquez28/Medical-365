
require('dotenv').config();

const Contexto = require('./Contexto.js');
const Colaborator = require('./Colaborators/Schema.js');

const Contexto = new Contexto();

//Collections
const colaboratorCollection = new Colaborator();

// const ticketsCollection = new Colaborator();
// const appointmentsCollection = new Colaborator();
// const indicatorsCollection = new Colaborator();
// const SintomasCollection = new Colaborator();
// const toolingsCollection = new Colaborator();

Contexto.setUpSchema(collection.model, collection.schema);
Contexto.create(collection.collection, data)


