
export default class Conexion {
    #uri;
    #path;

    static instance = null; // Static property to store the singleton instance
    mongooseContexto = null; 
    Conexion = null;

    constructor(mongoose) {
        if (Conexion.instance) {
            return Conexion.instance; // Return the existing instance if it exists
        }

        this.mongooseContexto = mongoose;
        this.#Initialize();
        this.#Connect();
        Conexion.instance = this; // Set the instance to the current object
    }

    #Initialize() {
        console.log('Initializing Conexion');

        this.#uri = process.env.CONNECTION_STRING_TO_DB;
        this.#path = process.env.PATH_TO_CERTIFICATE;

        console.log(this.#uri);
        console.log(this.#path);


        if (!this.#uri || !this.#path) {
            throw new Error('Missing environment variables for database Conexion.');
        }
    }

    async #Connect() {
        console.log('Connecting to MongoDB Atlas with X.509 authentication');
        console.log('URI:', this.#uri);
        console.log('Path:', this.#path);

        try {
            this.Conexion = await this.mongooseContexto.connect(this.#uri, {
                tls: true,
                tlsCertificateKeyFile: this.#path // Update this path to your .pem file
            });
            console.log('Connected to MongoDB Atlas');
        } catch (err) {
            console.error('Error connecting to MongoDB Atlas:', err);
            throw err; // Rethrow the error to handle it in the caller
        }
    }

    async connect() {
        if (!this.Conexion) {
            await this.#Connect();
        }
        return this.Conexion;
    }

    async #Disconnect() {
        if (this.Conexion) {  
            await this.mongooseContexto.disconnect();
            console.log('Disconnected from MongoDB Atlas');
            this.Conexion = null;
        }
    }

    async disconnect() {
        await this.#Disconnect();
    }
}

