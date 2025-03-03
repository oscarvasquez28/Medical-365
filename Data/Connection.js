
export default class Connection {
    #uri;
    #path;

    static instance = null; // Static property to store the singleton instance
    mongooseContext = null; 
    connection = null;

    constructor(mongoose) {
        if (Connection.instance) {
            return Connection.instance; // Return the existing instance if it exists
        }

        this.mongooseContext = mongoose;
        this.#Initialize();
        this.#Connect();
        Connection.instance = this; // Set the instance to the current object
    }

    #Initialize() {
        console.log('Initializing Connection');

        this.#uri = process.env.CONNECTION_STRING_TO_DB;
        this.#path = process.env.PATH_TO_CERTIFICATE;

        console.log(this.#uri);
        console.log(this.#path);


        if (!this.#uri || !this.#path) {
            throw new Error('Missing environment variables for database connection.');
        }
    }

    async #Connect() {
        console.log('Connecting to MongoDB Atlas with X.509 authentication');
        console.log('URI:', this.#uri);
        console.log('Path:', this.#path);

        try {
            this.connection = await this.mongooseContext.connect(this.#uri, {
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
        if (!this.connection) {
            await this.#Connect();
        }
        return this.connection;
    }

    async #Disconnect() {
        if (this.connection) {  
            await this.mongooseContext.disconnect();
            console.log('Disconnected from MongoDB Atlas');
            this.connection = null;
        }
    }

    async disconnect() {
        await this.#Disconnect();
    }
}

