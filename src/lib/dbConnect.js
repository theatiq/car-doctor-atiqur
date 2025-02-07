import { MongoClient, ServerApiVersion } from 'mongodb';
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.hnhnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export const collectionNameObj = {
    serviceCollection: "test_services",
    userCollection: "test_user",
    bookingCollection: "test_booking"
}


export default function dbConnect(collectionName) {
    const uri = process.env.MONGODB_URI
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
    return client.db(process.env.DB_NAME).collection(collectionName)

}

