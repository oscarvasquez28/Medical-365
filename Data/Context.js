import mongoose from "mongoose";
import Connection from './Connection.js'

import dotenv from 'dotenv';
dotenv.config();


export default class Context {
    mongoose = null;    
    connection = null;

    constructor() {
        this.connection = new Connection(mongoose);
        this.mongoose = this.connection.mongooseContext;
    }

    async create(model, data) {
        try {
            const Model = this.mongoose.model(model);
            const newModel = new Model(data);
            await newModel.save();
            console.log(`${model} saved successfully`);
        } catch (err) {
            console.error(`Error saving ${model}:`, err);
        }
    }

    async createMany(model, data) {
        try {
            console.log('Saving', model);
            const Model = this.mongoose.model(model);
            await Model.insertMany(data);
            console.log(`${model}s saved successfully`);
        } catch (err) {
            console.error(`Error saving ${model}s:`, err);
        }
    }

    async select(model) {
        try {
            const Model = this.mongoose.model(model);
            const models = await Model.find();
            console.log(`${model}s:`, models);
        } catch (err) {
            console.error(`Error querying ${model}s:`, err);
        }
    }

    async update(model, filter, data) {
        try {
            const Model = this.mongoose.model(model);
            await Model.updateOne(filter, data);
            console.log(`${model} updated`);
        } catch (err) {
            console.error(`Error updating ${model}:`, err);
        }
    }

    async delete(model, filter) {
        try {
            const Model = this.mongoose.model(model);
            await Model.deleteOne(filter);
            console.log(`${model} deleted`);
        } catch (err) {
            console.error(`Error deleting ${model}:`, err);
        }
    }

    async setUpSchema(model, schema) {
        try {
            console.log('Setting up schema for', model);
            if (this.mongoose.modelNames().includes(model)) {
                console.log(`Model ${model} already exists. Skipping schema setup.`);
                return;
            }
            const ModelSchema = new this.mongoose.Schema(schema);
            this.mongoose.model(model, ModelSchema);
        } catch (error) {
            console.error('Error setting up schema for', model, ':', error);
        }
    }

    async closeConnection() {
        try {
            await this.connection.disconnect();
            this.mongoose = null;
            console.log('Connection closed');
        } catch (error) {
            console.error('Error closing connection:', error);
        }
    }
}
