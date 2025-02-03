require('dotenv').config();

const mongoose = require('mongoose');

const uri = process.env.CONNECTION_STRING_TO_DB;
const path = process.env.PATH_TO_CERTIFICATE0;

export default class Context {
    Connection = null; 

    constructor() {
        if(this.Connection == null) {
            this.#Connect();
        }
        else 
            return this.Connection;
    }

    async #Connect(){

        //It is necessary before to connect to the database set the environment variables and have a valid .pem file

        this.connection = await mongoose.connect(uri, {
            tls: true,
            tlsCertificateKeyFile: path // Update this path to your .pem file
        })
        .then(() => {
            console.log('Connected to MongoDB Atlas');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB Atlas:', err);
        });
        
    }

    async #Disconnect(){
        await mongoose.disconnect();
    }
} 

