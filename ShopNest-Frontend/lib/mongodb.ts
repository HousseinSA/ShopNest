import { MongoClient, Db, MongoClientOptions } from 'mongodb';

// Ensure that the DATABASE_URL environment variable is defined
const uri = process.env.DATABASE_URL as string;
  
if (!uri) {
  throw new Error('Please define the DATABASE_URL environment variable in your .env.local file');
}

// Use the latest MongoDB client options
const options: MongoClientOptions = {};
  
let client: MongoClient;

// Function to connect to the database
export async function connectToDatabase(): Promise<Db> {
  // Create a new client if one does not already exist
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect(); // Connect to the database

    const db = client.db(); // Use the database specified in the connection string

    // Create the users collection if it doesn't exist
    const collections = await db.listCollections({ name: 'users' }).toArray();
    if (collections.length === 0) {
      await db.createCollection('users'); 
    } 
  }

  return client.db();
}
