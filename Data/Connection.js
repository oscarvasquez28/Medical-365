class Connection {
    #uri;
    #path;

    mongooseContext = null; 
    connection = null;


    constructor(mongoose) {
        if(this.Connection == null) {
            this.mongooseContext = mongoose
            this.#Initialize();
            this.#Connect();
        }
        else 
            return this.mongooseContext;
    }

    #Initialize(){
        this.#uri = process.env.CONNEC TION_STRING_TO_DB;
        this.#path = process.env.PATH_TO_CERTIFICATE;
    }

    async #Connect(){

        //It is necessary before to connect to the database set the environment variables and have a valid .pem file
        
        console.log('Connecting to MongoDB Atlas with X.509 authentication');

        console.log('URI:', this.#uri);
        console.log('Path:', this.#path);

        this.Connection = await this.mongooseContext.connect(this.#uri, {
            tls: true,
            tlsCertificateKeyFile: this.#path // Update this path to your .pem file
        })
        .
        then(() => {
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

module.exports = Connection;
