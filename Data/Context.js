
const mongoose = require('mongoose');
const Connection = require('./Connection.js');

class Context {

    mongoose = null;
    connection = null;

    constructor() {
        this.connection = new Connection(mongoose);
        this.mongoose = this.connection.mongooseContext;
    }

    async create(model, data) {
        const Model = this.mongoose.model(model);
        const newModel = new Model(data);

        await newModel.save()
            .then(() => console.log(`${model} saved successfully`))
            .catch(err => console.error(`Error saving ${model}:`, err));
    }

    async select(model) {
        const Model = this.mongoose.model(model);

        await Model.find()
            .then(models => console.log(`${model}s:`, models))
            .catch(err => console.error(`Error querying ${model}s:`, err));
    }

    async update(model, filter, data) {
        const Model = this.mongoose.model(model);

        await Model.updateOne(filter, data)
            .then(() => console.log(`${model} updated`))
            .catch(err => console.error(`Error updating ${model}:`, err));
    }

    async delete(model, filter) {
        const Model = this.mongoose.model(model);

        await Model.deleteOne(filter)
        .then(() => console.log(`${model} deleted`))
        .catch(err => console.error(`Error deleting ${model}:`, err));
    }

    async setUpSchema(model, schema) {
        console.log('Setting up schema for', model);
    
        try {

            // Create a new Mongoose schema using the provided schema definition
            const ModelSchema = new this.mongoose.Schema(schema);
            // Create a Mongoose model using the schema
            this.mongoose.model(model, ModelSchema);
            
        } catch (error) {
            console.error('Error setting up schema for', model, ':', error);
        }
    }

    async preSave (model, callback) {
        const Model = this.mongoose.model(model);
        Model.pre('save', callback);
    }

    async closeConnection() {
        await context.Disconnect();
        this.mongoose = null;
    }


}

module.exports = Context;





