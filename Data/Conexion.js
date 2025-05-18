
export default class Conexion {
    #uri;
    #connectionStringCertificate;
    #pathToCertificate;

    static instance = null; // Static property to store the singleton instance
    mongooseContexto = null; 
    Conexion = null;

    constructor(mongoose) {
        if (Conexion.instance) {
            return Conexion.instance; // Return the existing instance if it exists
        }

        this.mongooseContexto = mongoose;
        this.#Initialize();
        this.#ConnectByPassword();
        Conexion.instance = this; // Set the instance to the current object
    }

    #Initialize() {
        console.log('Initializing Conexion');

        this.#uri = process.env.URI;
        this.#connectionStringCertificate = process.env.CONNECTION_STRING_TO_CERTIFICATE;
        this.#pathToCertificate = process.env.PATH_TO_CERTIFICATE;

        console.log(this.#uri);
        console.log(this.#pathToCertificate);

            if (!this.#uri || !this.#pathToCertificate) {
            throw new Error('Missing environment variables for database Conexion.');
        }
    }

    async #ConnectByPassword(   ) {
        console.log('Connecting to MongoDB Atlas with password authentication');
        console.log('URI:', this.#uri);

        console.log('user:', process.env.DB_USER);
        console.log('pass:', process.env.DB_PASSWORD);

        try {
            this.Conexion = await this.mongooseContexto.connect(this.#uri, {
                user: process.env.DB_USER,
                pass: process.env.DB_PASSWORD
            });
            console.log('Connected to MongoDB Atlas');
        } catch (err) {
            console.error('Error connecting to MongoDB Atlas:', err);
            throw err; // Rethrow the error to handle it in the caller
        }
    }

    async #ConnectByCertifiacte() {
        console.log('Connecting to MongoDB Atlas with X.509 authentication');
        console.log('URI:', this.#connectionStringCertificate);
        console.log('pathToCertificate:', this.#pathToCertificate);

        try {
            this.Conexion = await this.mongooseContexto.connect(this.#connectionStringCertificate, {
                tls: true,
                tlsCertificateKeyFile: this.#pathToCertificate // Update this pathToCertificate to your .pem file
            });
            console.log('Connected to MongoDB Atlas');
        } catch (err) {
            console.error('Error connecting to MongoDB Atlas:', err);
            throw err; // Rethrow the error to handle it in the caller
        }
    }

    async connect() {
        if (!this.Conexion) {
            await this.#ConnectByPassword();
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

